import os
from requests import get as rq_get
from random import randrange, sample
from datetime import date, timedelta

SETTINGS = {
    'API_URI': 'https://api.themoviedb.org/3',
    'API_KEY': 'fce82b36f048218ceb92a41a9d1ce53a',
    'OUTPUT_FOLDER': os.path.abspath(os.path.join(os.path.dirname(__file__), os.pardir, 'data')),
    'FILE_NAMES': {
        'films': 'films.sql',
        'series': 'series.sql',
        'seasons': 'season.sql',
        'episodes': 'episodes.sql',
        'show_categories': 'show_categories.sql',
        'show_languages': 'show_languages.sql',
        'show_actors': 'show_actors.sql',
        'inventory': 'inventory.sql',
        'rentals': 'rentals.sql'
    },
    'ESCAPE_CHARS': ("'", "’", "“", "”", ";"),
    'REPLACE_CHARS': ('\"', '\"', '\"', '\"', '?'),
    'FILM_IDS': (
        505642, 238, 278, 424, 129, 372058, 496243, 497, 155, 680, 120,
        121, 122, 92321, 378064, 1891, 330459, 635302, 810693, 299534, 299536
    ),
    'SERIES_IDS': (94605, 114410, 60574, 94997, 1396, 84773, 1399, 31911),
    'SHOWS_COUNT': 642,
    'CATEGORIES_COUNT': 16,
    'LANGUAGES_COUNT': 4,
    'ACTORS_COUNT': 10010,
    'TARGET_INVENTORY_SIZE': 400,
    'CUSTOMER_COUNT': 50
}


# ==============================
# Helpers
# ==============================
def request(mid_section: str, end_section: str = ''):
    return rq_get(f"{SETTINGS['API_URI']}{mid_section}?api_key={SETTINGS['API_KEY']}{end_section}").json()


def escape_str_chars(
        input_str: str, escape_chars=SETTINGS['ESCAPE_CHARS'], replace_chars=SETTINGS['REPLACE_CHARS']
) -> str:
    if len(escape_chars) != len(replace_chars):
        raise Exception("Length of input items don't match")

    for i in range(len(escape_chars)):
        input_str = input_str.replace(escape_chars[i], replace_chars[i])

    return input_str


def get_output_str(item_list: [tuple]) -> str:
    output_str = ''
    for i, row in enumerate(item_list):
        output_str += "  ("

        for j, col in enumerate(row):
            output_str += (f"'{col}'," if j < len(row) - 1 else f"'{col}'")

        output_str += ("),\n" if i < len(item_list) - 1 else ");\n")

    return output_str


# ==============================
# Generate data
# ==============================
def films():
    print("INFO: Fetching films")

    # Fetch data
    films_list: [tuple] = []
    for film_id in SETTINGS['FILM_IDS']:
        film_details = request(f"/movie/{film_id}")
        for content in ('title', 'overview'):
            film_details[content] = escape_str_chars(film_details[content])

        # title, description, release_date, rating, poster_path, original_language_id, show_season_id
        films_list.append((
            film_details['title'],
            film_details['overview'],
            film_details['release_date'],
            (['R', 'NC-17'][randrange(0, 1)] if film_details['adult'] else ['G', 'PG', 'PG-13'][randrange(0, 2)]),
            'https://image.tmdb.org/t/p/w500' + film_details['poster_path'],
            randrange(1, 4),
            1
        ))

    # Write to file
    filepath = os.path.join(SETTINGS['OUTPUT_FOLDER'], SETTINGS['FILE_NAMES']['films'])
    with open(file=filepath, mode='w', encoding='utf8') as file:
        file.write(
            "INSERT INTO show_group (name)\nVALUES\n  ('Standalone Film');\n\n"
            "INSERT INTO show_season (show_group_id)\nVALUES\n  (1);\n\n"
            "INSERT INTO `show` "
            "(title,description,release_date,rating,poster_path,original_language_id,show_season_id)\nVALUES\n"
        )
        file.write(get_output_str(films_list))


def series():
    print("INFO: Fetching series")

    # Fetch data
    series_list: [tuple] = []
    for series_id in SETTINGS['SERIES_IDS']:
        series_details = request(f"/tv/{series_id}")
        series_details['name'] = escape_str_chars(series_details['name'])

        # name, poster_path, release_date
        series_list.append((
            series_details['name'],
            'https://image.tmdb.org/t/p/w500' + series_details['poster_path'],
            series_details['first_air_date']
        ))

    # Write to file
    filepath = os.path.join(SETTINGS['OUTPUT_FOLDER'], SETTINGS['FILE_NAMES']['series'])
    with open(file=filepath, mode='w', encoding='utf8') as file:
        file.write("INSERT INTO show_group (name,poster_path,release_date)\nVALUES\n")
        file.write(get_output_str(series_list))


def seasons():
    print("INFO: Fetching seasons")

    # Fetch data
    seasons_list: [tuple] = []
    for i, series_id in enumerate(SETTINGS['SERIES_IDS']):
        series_details = request(f"/tv/{series_id}")
        for season in series_details['seasons']:
            # season_no, show_group_id
            seasons_list.append((
                season['season_number'],
                i + 2
            ))

    # Write to file
    filepath = os.path.join(SETTINGS['OUTPUT_FOLDER'], SETTINGS['FILE_NAMES']['seasons'])
    with open(file=filepath, mode='w', encoding='utf8') as file:
        file.write("INSERT INTO show_season (season_no,show_group_id)\nVALUES\n")
        file.write(get_output_str(seasons_list))


def episodes():
    print("INFO: Fetching episodes")

    # Fetch data
    episodes_list: [tuple] = []
    season_counter = 2
    for series_id in SETTINGS['SERIES_IDS']:
        series_details = request(f"/tv/{series_id}")
        for i, season in enumerate(series_details['seasons']):
            season_details = request(f"/tv/{series_id}/season/{season['season_number']}")
            for episode in season_details['episodes']:
                # Escape characters
                for content in ('name', 'overview'):
                    episode[content] = escape_str_chars(episode[content])

                # title, description, release_date, rating, is_film, episode_no, original_language_id, show_season_id
                episodes_list.append((
                    episode['name'],
                    episode['overview'],
                    episode['air_date'],
                    ['G', 'PG', 'PG-13', 'R', 'NC-17'][randrange(0, 4)],
                    'FALSE',
                    episode['episode_number'],
                    randrange(1, 4),
                    season_counter
                ))

            season_counter += 1

    # Write to file
    filepath = os.path.join(SETTINGS['OUTPUT_FOLDER'], SETTINGS['FILE_NAMES']['episodes'])
    with open(file=filepath, mode='w', encoding='utf8') as file:
        file.write(
            "INSERT INTO `show` "
            "(title,description,release_date,rating,is_film,episode_no,original_language_id,show_season_id)\nVALUES\n"
        )
        file.write(get_output_str(episodes_list))


def show_categories():
    print("INFO: Generating show categories")

    # Generate data
    categories_list: [tuple] = []
    for i in range(SETTINGS['SHOWS_COUNT']):
        # Generate 1-4 random unique categories
        cat_array = sample(range(1, SETTINGS['CATEGORIES_COUNT'] + 1), randrange(1, 5))
        for category_id in cat_array:
            # show_id, category_id
            categories_list.append((i + 1, category_id))

    # Write to file
    filepath = os.path.join(SETTINGS['OUTPUT_FOLDER'], SETTINGS['FILE_NAMES']['show_categories'])
    with open(file=filepath, mode='w', encoding='utf8') as file:
        file.write("INSERT INTO show_category (show_id,category_id)\nVALUES\n")
        file.write(get_output_str(categories_list))


def show_languages():
    print("INFO: Generating show languages")

    # Generate data
    languages_list: [tuple] = []
    for i in range(SETTINGS['SHOWS_COUNT']):
        # Generate 1-2 random unique languages
        lang_array = sample(range(1, SETTINGS['LANGUAGES_COUNT'] + 1), randrange(1, 3))
        for lang_id in lang_array:
            # show_id, language_id
            languages_list.append((i + 1, lang_id))

    # Write to file
    filepath = os.path.join(SETTINGS['OUTPUT_FOLDER'], SETTINGS['FILE_NAMES']['show_languages'])
    with open(file=filepath, mode='w', encoding='utf8') as file:
        file.write("INSERT INTO show_language (show_id,language_id)\nVALUES\n")
        file.write(get_output_str(languages_list))


def show_actors():
    print("INFO: Generating show actors")

    # Generate data
    actors_list: [tuple] = []
    for i in range(SETTINGS['SHOWS_COUNT']):
        # Generate 1-3 random unique actors
        act_array = sample(range(1, SETTINGS['ACTORS_COUNT'] + 1), randrange(1, 4))
        for actor_id in act_array:
            # show_id, actor_id
            actors_list.append((i + 1, actor_id))

    # Write to file
    filepath = os.path.join(SETTINGS['OUTPUT_FOLDER'], SETTINGS['FILE_NAMES']['show_actors'])
    with open(file=filepath, mode='w', encoding='utf8') as file:
        file.write("INSERT INTO show_actor (show_id,actor_id)\nVALUES\n")
        file.write(get_output_str(actors_list))


def inventory():
    print("INFO: Generating inventory")

    # Generate data
    inventory_list = [
        (show_id,) for show_id in sample(range(1, SETTINGS['SHOWS_COUNT'] + 1), SETTINGS['TARGET_INVENTORY_SIZE'])
    ]

    # Write to file
    filepath = os.path.join(SETTINGS['OUTPUT_FOLDER'], SETTINGS['FILE_NAMES']['inventory'])
    with open(file=filepath, mode='w', encoding='utf8') as file:
        file.write("INSERT INTO inventory (show_id)\nVALUES\n")
        file.write(get_output_str(inventory_list))


def rentals():
    print("INFO: Generating rentals")

    # Generate data
    start_date, end_date = date(2018, 1, 1), date(2022, 11, 1)
    days_diff = (end_date - start_date).days

    rentals_list: [tuple] = []
    rand_customer_order = sample(range(1, SETTINGS['CUSTOMER_COUNT'] + 1), SETTINGS['CUSTOMER_COUNT'])
    for customer_id in rand_customer_order:
        # Generate 50-150 rentals for each customer
        rentals_amount = randrange(50, 150)
        for i in range(rentals_amount):
            # customer_id, inventory_id, created_at
            rentals_list.append((
                customer_id,
                randrange(1, SETTINGS['TARGET_INVENTORY_SIZE'] + 1),
                # Random date between start_date and end_date
                str(start_date + timedelta(days=randrange(days_diff)))
            ))

    # Write to file
    filepath = os.path.join(SETTINGS['OUTPUT_FOLDER'], SETTINGS['FILE_NAMES']['rentals'])
    with open(file=filepath, mode='w', encoding='utf8') as file:
        file.write("INSERT INTO rental (customer_id,inventory_id,created_at)\nVALUES\n")
        file.write(get_output_str(rentals_list))


if __name__ == '__main__':
    # +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    # +++ Generate step by step and change SETTINGS as needed +++
    # +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

    print("==============================")
    # ++++++++++++++++++++++++++++++++++++++++++++++
    # +++ Uncomment below for each specific type +++
    # ++++++++++++++++++++++++++++++++++++++++++++++

    # films()
    # series()
    # seasons()
    # episodes()
    # show_categories()
    # show_languages()
    # show_actors()
    # inventory()
    # rentals()

    # ++++++++++++++++++++++++++++++++++++++++++++++
    # +++ Uncomment above for each specific type +++
    # ++++++++++++++++++++++++++++++++++++++++++++++
    print("==============================")
