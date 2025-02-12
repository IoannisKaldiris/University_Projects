# Χρήση της τελευταίας έκδοσης Python
FROM python:3.9

# Ορισμός του working directory στο container
WORKDIR /app

# Αντιγραφή των αρχείων στο container
COPY . /app

# Εγκατάσταση απαιτούμενων βιβλιοθηκών
RUN pip install pandas

# Άνοιγμα των ports για επικοινωνία μεταξύ των nodes
EXPOSE 5300-5310

# Εκκίνηση του script
CMD ["python", "pastry.py"]