USE rentomatic;

-- ==============================
-- Base Stored Procedures
-- ==============================

-- 3.1
DELIMITER $$
DROP PROCEDURE IF EXISTS shows_with_most_rentals$$
CREATE PROCEDURE shows_with_most_rentals(
  IN type ENUM('m', 's'),
  IN quantity INT UNSIGNED,
  IN start_date DATE,
  IN end_date DATE
)
BEGIN
  IF type = 'm' THEN
    SELECT s.id, s.title, COUNT(s.id) AS amount FROM rental r
    LEFT JOIN inventory i ON r.inventory_id = i.id
    LEFT JOIN `show` s ON i.show_id = s.id
    WHERE s.is_film = TRUE AND r.created_at BETWEEN start_date AND end_date
    GROUP BY s.id
    ORDER BY amount DESC
    LIMIT quantity;
  ELSEIF type = 's' THEN
    SELECT sg.id, sg.name, COUNT(sg.id) AS amount FROM rental r
    LEFT JOIN inventory i ON r.inventory_id = i.id
    LEFT JOIN `show` s ON i.show_id = s.id
    LEFT JOIN show_season ss ON s.show_season_id = ss.id
    LEFT JOIN show_group sg ON ss.show_group_id = sg.id
    WHERE s.is_film = FALSE AND r.created_at BETWEEN start_date AND end_date
    GROUP BY sg.id
    ORDER BY amount DESC
    LIMIT quantity;
  END IF;
END;$$
DELIMITER ;

-- 3.2
DELIMITER $$
DROP PROCEDURE IF EXISTS customer_rentals$$
CREATE PROCEDURE customer_rentals(
  IN in_email VARCHAR(50),
  IN in_date DATE,
  OUT quantity SMALLINT UNSIGNED
)
BEGIN
  SELECT COUNT(r.id) INTO quantity FROM rental r
  LEFT JOIN customer c on r.customer_id = c.id
  WHERE c.email = in_email AND DATE(r.created_at) = in_date;
END;$$
DELIMITER ;

-- 3.3
DELIMITER $$
DROP PROCEDURE IF EXISTS sales_per_month$$
CREATE PROCEDURE sales_per_month()
BEGIN
  SELECT YEAR(r.created_at) AS yr, MONTH(r.created_at) AS mn,
  SUM(p.amount) AS total FROM payment p
  LEFT JOIN rental r ON r.id = p.rental_id
  LEFT JOIN inventory i ON r.inventory_id = i.id
  LEFT JOIN `show` s ON i.show_id = s.id
  WHERE s.is_film = TRUE
  GROUP BY MONTH(r.created_at)
  ORDER BY r.created_at DESC;

  SELECT YEAR(r.created_at) AS yr, MONTH(r.created_at) AS mn,
  SUM(p.amount) AS total FROM payment p
  LEFT JOIN rental r ON r.id = p.rental_id
  LEFT JOIN inventory i ON r.inventory_id = i.id
  LEFT JOIN `show` s ON i.show_id = s.id
  WHERE s.is_film = FALSE
  GROUP BY MONTH(r.created_at)
  ORDER BY r.created_at DESC;
END;$$
DELIMITER ;

-- 3.4.a
DELIMITER $$
DROP PROCEDURE IF EXISTS actors_in_range$$
CREATE PROCEDURE actors_in_range(
  IN start_name VARCHAR(50),
  IN end_name VARCHAR(50),
  OUT quantity MEDIUMINT UNSIGNED
)
BEGIN
  SELECT first_name, last_name FROM actor
  WHERE last_name BETWEEN start_name AND end_name;

  SELECT COUNT(last_name) INTO quantity FROM actor
  WHERE last_name BETWEEN start_name AND end_name;
END;$$
DELIMITER ;

-- 3.4.b
DELIMITER $$
DROP PROCEDURE IF EXISTS actors_with_common_last_name$$
CREATE PROCEDURE actors_with_common_last_name(
  IN in_name VARCHAR(50),
  OUT quantity SMALLINT UNSIGNED
)
BEGIN
  SELECT first_name, last_name FROM actor
  WHERE last_name = in_name;
  
  SELECT COUNT(last_name) INTO quantity FROM actor
  WHERE last_name = in_name;
END;$$
DELIMITER ;

-- ==============================
-- Extra Stored Procedures
-- ==============================

-- Calculates the correct price for a user
DELIMITER $$
DROP PROCEDURE IF EXISTS calculate_rental_price$$
CREATE PROCEDURE calculate_rental_price(
  IN customer_id MEDIUMINT UNSIGNED,
  IN in_show_type ENUM('FILM', 'EPISODE'),
  OUT payment_amount DECIMAL(5, 2)
)
BEGIN
  SELECT amount INTO payment_amount FROM price
  WHERE sub_type = (SELECT sub_type FROM customer WHERE id = customer_id)
  AND show_type = in_show_type
  ORDER BY created_at DESC LIMIT 1;
END;$$
DELIMITER ;
