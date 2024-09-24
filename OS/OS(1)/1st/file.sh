#!/bin/bash

#########################################################
# Ξηρομερίτης Άγγελος,           1088601
# Μπαλής Γεώργιος,	             1040996 (παλαιός:235230)
# Κωστόπουλος Στέφανος Ιωάννης,  1093404
# Ιωάννης Καλδίρης,	             1080428
#########################################################

selected_file="No file selected" # Μεταβλητή η οποία περιέχει πληροφορία για το αρχείο το οποίο έχει επιλέξει ο χρήστης 

log_file="change_log.txt" # Αρχείο στο οποίο εμφανίζονται οι αλλαγές του χρήστη

temp_file="temp_businesses.csv" # Temp αρχείο με τις αλλαγές του χρήστης εώς ότου κάνει save

> "$log_file" # Αρχικοποίηση ή καθαρισμός του αρχείου καταγραφής αλλαγών

result_data="" # αποτελέσματα search

# Πρώτο Ερώτημα Επιλογής Αρχείου

select_csv() {

  while true; do

    echo -e "\n Εισάγεται το path του αρχείου (default file 'Businesses.csv'): "

    read -p " > " file_dir # Ανάγνωση Επιλογής

    # Χρήση προεπιλεγμένου  αρχείου αν δεν δοθεί input απο τον χρήστη

    [ -z "$file_dir" ] && file_dir="Businesses.csv"

    # Έλεγχος αν το αρχείο υπάρχει και αν μπορεί να διαβαστεί

    if [ -f "$file_dir" ] && [ -r "$file_dir" ]; then

      selected_file="$file_dir" 

      cp "$selected_file" "$temp_file"  # Αντιγραφή του αρχικού αρχείου σε προσωρινό αρχείο
                                        # κυρίως για να περνάνε οι αλλαγές εκεί 

      echo -e "\n Success: Το αρχείο '$file_dir' επιλέχθηκε επιτυχώς.\n" 

      break
  
    else
      echo -e "\n Error: Το αρχείο δεν βρέθηκε.\n"
    fi
  done
}

# Ερώτημα 4 χρήση του more

view_all_file_data() {

  if [ "$selected_file" = "No file selected" ]; then
    echo -e "\n Waring: Δεν έχει επιλεχθεί κάποιο αρχείο !\n"
    return
  fi

  # Χρήση awk για μορφοποίηση και εμφάνιση κάθε γραμμής, με παύση μετά από κάθε πλήρη οθόνη
  awk -F, 'BEGIN { print "ID, Name, Street, City, Postal Code, Longitude, Latitude"
                   print "========================================================="}
           {print $1 ", " $2 ", " $3 ", " $4 ", " $5 ", " $6 ", " $7 }' "$temp_file" | more
}

# Eρώτημα 2 Προβολής Στοιχείων Επιχείρισης  


view_element_info() {

  # Έλεγχος για το αν έχει επιλεχθεί αρχείο

  if [ "$selected_file" = "No file selected" ]; then
    echo -e "\n Waring: Δεν έχει επιλεχθεί κάποιο αρχείο !\n"
    return
  fi


  while true; do
    echo -e "\n Enter the company code (ID) to search or press 0 to go back to the menu: "
    read -p " > " business_id

    if [ "$business_id" = "0" ]; then   # Επιστροφή στο μενού αν ο χρήστης πατήσει 0
      return
    fi

    # Έλεγχος αν ο κωδικός εταιρείας είναι θετικός αριθμός
    
    if ! [[ "$business_id" =~ ^[0-9]+$ ]]; then
      echo -e "\n Error: O Κωδικός Επιχείρησης θα πρέπει να είναι θετικός integer αριθμός. Please try again."
      continue
    fi

    # Αναζήτηση του κωδικού εταιρείας στο προσωρινό αρχείο
    # - F θέτει σε comma τον seperator
    # - v αναθέτει το business id στην awk μεταβλητή code 
    # αν γίνει match το code με το id της επιχείρησης τότε δεσμεύομε όλη την γραμμη 
    # το αποτέλεσμα ανατίθεται στην μεταβλητη search result 

    search_data=$(awk -F, -v code="$business_id" '$1 == code {print $0}' "$temp_file")


    if [ -n "$search_data" ]; then # Aν η μεταβλητή αυτή δεν ειναι null

      # Eκτύπωση των δεδομένων της επιχείρησης

      echo -e "\n Τα Δεδομένα της επιχείρησης βρεθηκαν επιτυχώς:\n"

      # μεσω της sed μετατρέπουμε τα commas σε new lines 
      # μετατρέπουμε έτσι την γραμμη σε πολλάπλές γραμμες 
      # αναθέτουμε το αποτέλεσμα στην awk η οποία μεσω της NR
      # κάνει process κάθε γραμμή ξεχωριστά και εκτυπώνει το πεδίο

      echo "$search_data" | sed 's/,/\n/g' | awk '
      NR==1 {print " ID           : " $0}
      NR==2 {print " Name         : " $0}
      NR==3 {print " Street       : " $0}
      NR==4 {print " City         : " $0}
      NR==5 {print " Postal Code  : " $0}
      NR==6 {print " Longitude    : " $0}
      NR==7 {print " Latitude     : " $0}'

      # Return τα data για να μπορουμε να χρησιμοποιήσουμε την συνάρτηση σε αλλες functions 
      result_data="$search_data"
      return 0

    else
      echo -e "\n Δεν βρέθηκαν αποτελέσματα για την επιχείτηση με κωδικό '$business_id'. Please try again or press 0 to go back to the menu."
    fi

  done
}

# Ερώτημα 3

modify_file_element() {

    result_data=""              # καθαρισμός της μεταβλητής
    view_element_info           # κλήση της συνάρτησης
    result_data="$result_data"  # ανάθεση του αποτλέσματος στην μεταβλητή

    if [ $? -ne 0 ]; then       # ελέγζουμε εαν η function που καλέσαμε εκτελέστηκε επιτυχώς
      return
    fi

    while true; do

      echo -e "\n Εισάγετε τον αριθμό του πεδίου που θέλετε να τροποποιείσετε (1-7) ή 0 για επιστροφή στο κύριο menu: "
      read -p " > " col_index

      if [ "$col_index" = "0" ]; then  # αν επιλέξει 0 τότε επιστρέφει στο αρχικό menu
        return
      fi

      # επιλογή πεδίου απο 1-7 
      case $col_index in
        1) echo -e "\n Το ID δεν μπορεί να αλλάξει."; continue ;;
        2) col_name="Name" ;;
        3) col_name="Street" ;;
        4) col_name="City" ;;
        5) col_name="Postal Code" ;;
        6) col_name="Longitude" ;;
        7) col_name="Latitude" ;;
        *)
          echo -e "\n Warining: Εισάγετε αριθμό (1-7) ή 0 για επιστροφή στο κύριο menu: "
          continue;;
      esac
      break
    done
 
    while true; do # εδώ ο χρήστης θα θέσει νέα τιμή στο επιλεγμένο πεδίο

      echo -e "\n Εισάγετε νέα τιμή για το πεδίο $col_name ή 0 για μεταφορά στο αρχικό menu: "
      read -p " > " updated_val

      if [ "$updated_val" = "0" ]; then # αν ο χρήστης επιλέξει 0 μεταφέρεται στο αρχικό menu
        return
      fi
      
      # ελεγχος της μορφής του lat lng αν ειναι δεκαδικός αριθμός 

      if [[ "$col_name" == "Longitude" || "$col_name" == "Latitude" ]]; then
        if ! [[ "$updated_val" =~ ^-?[0-9]+(\.[0-9]+)?$ ]]; then 
          echo -e "\n Error: $col_name θα πρέπει να είναι decimal μορφής. Εισάγετε έγκυρη μορφή (π.χ. -4.136909)."
          continue
        fi
      fi

      break
    done

    # λαμβάνουμε το περιεχόμενο της result_data και το αναθελτουμε στην awk
    # ορίζουμε την awk μεταβλητη rec και αναθέτουμε στην old_value την παλια τιμή του record

    old_value=$(echo "$result_data" | awk -F, -v rec="$col_index" '{print $rec}')

    echo -e "\n Αλλαγή $col_name:"

    echo " Παλιά Τιμή : $old_value" # παλία τιμή

    echo " Νέα Τιμή : $updated_val" # νέα τιμή

    # θετουμε τον field seperator σε comma διοτι διαχειριζόμαστε csv αρχειο
    # rec="$col_index" το column που αλλάξαμε
    # η νέα τιμή του column new="$updated_val
    # σε ποια επιχείρηση απευθυνόμαστε code="$business_id"
    # Ο output field seperator να είναι ίδιο με το input BEGIN {OFS=FS}

    awk -F, -v rec="$col_index" -v new="$updated_val" -v code="$business_id" 'BEGIN {OFS=FS}
      $1 == code {$rec = new} {print}' "$temp_file" > temp && mv temp "$temp_file"

    echo "Changed $col_name from '$old_value' to '$updated_val' for ID: $business_id" >> "$log_file"

    echo -e "\n Οι αλλαγές καταγράφηκαν και στο log αρχείο.\n"
}

# Ερώτημα 5

save_modifications() { # Λειτουργία αποθήκευσης των αλλαγών από το προσωρινό αρχείο στο αρχικό αρχείο

  if [ ! -s "$log_file" ]; then # log file exists and not empty
  
    echo -e "\n Δεν υπάρχουν αλλαγές.\n"
    return
  fi

  echo -e "\n Αλλαγές :\n"

  cat "$log_file" # ανοιγμα log αρχείου που βρίσκονται οι αλλαγές

  echo -e "\n Θέλετε να οριστικοποιείσετε τις αλλαγές ? (yes/no): "

  read -p "> " confirm  # επιλογή από τον χρήστη 

  if [ "$confirm" = "yes" ]; then

    mv "$temp_file" "$selected_file"

    echo -e "\n Οι αλλαγές οριστικοποιήθηκαν !\n"

    > "$log_file" # Καθαρισμός του αρχείου καταγραφής μετά την αποθήκευση

  else

    echo -e "\n Αποτυχία αποθήκευσης αλλαγών.\n"

  fi
}

while true; do

  # Εμφάνιση του αρχικού μενού επιλογών
  echo -e "\n Επιλεγμένο Αρχείο: $selected_file\n"
  echo -e " Please choose an option:\n"
  echo " 1. Επιλογή αρχείου επιχειρήσεων"
  echo " 2. Προβολή στοιχείων επιχείρησης"
  echo " 3. Αλλαγή στοιχείου επιχείρησης"
  echo " 4. Προβολή αρχείου"
  echo " 5. Αποθήκευση αρχείου"
  echo -e " 6. Έξοδος\n"
  read -p " Enter your choice: > " input

  case $input in
    0) echo -e "\n Επιστροφή στην Αρχική Οθόνη ...\n" ;;
    1) select_csv ;;
    2) view_element_info ;;
    3) modify_file_element ;;
    4) view_all_file_data ;;
    5) save_modifications ;;
    6) echo -e "\n Έξοδος ... \n"
       exit 0 ;;
    *) echo -e "\nInvalid choice. Please enter 1 - 6. \n" ;;
  esac
done
