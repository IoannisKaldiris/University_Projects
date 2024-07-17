USE rentomatic;

-- ==============================
-- Base Triggers
-- ==============================

-- 4.1 - rental
DELIMITER $$
DROP TRIGGER IF EXISTS rental_log$$
CREATE TRIGGER rental_log AFTER INSERT ON rental
FOR EACH ROW
BEGIN
  INSERT INTO customer_log (type, `table`, customer_id, created_at) VALUES
  ('INSERT', 'rental', NEW.customer_id, NEW.created_at);
END;$$
DELIMITER ;

-- 4.1 - payment
DELIMITER $$
DROP TRIGGER IF EXISTS payment_log$$
CREATE TRIGGER payment_log AFTER INSERT ON payment
FOR EACH ROW
BEGIN
  INSERT INTO customer_log (type, `table`, customer_id, created_at) VALUES
  ('INSERT', 'payment', NEW.customer_id, NEW.created_at);
END;$$
DELIMITER ;

-- 4.2
DELIMITER $$
DROP TRIGGER IF EXISTS discount_payment$$
CREATE TRIGGER discount_payment BEFORE INSERT ON payment
FOR EACH ROW
BEGIN
  DECLARE l_email VARCHAR(50);
  DECLARE l_day_rentals SMALLINT UNSIGNED;
  
  SELECT email INTO l_email FROM customer WHERE id = NEW.customer_id;
  CALL customer_rentals(l_email, NOW(), l_day_rentals);
  
  IF l_day_rentals > 0 AND MOD(l_day_rentals, 3) = 0 THEN
    SET NEW.amount = NEW.amount / 2;
  END IF;
END;$$
DELIMITER ;

-- 4.3
DELIMITER $$
DROP TRIGGER IF EXISTS valid_customer_update$$
CREATE TRIGGER valid_customer_update BEFORE UPDATE ON customer
FOR EACH ROW
BEGIN
  IF NEW.id != OLD.id OR NEW.email != OLD.email OR NEW.created_at != OLD.created_at THEN
    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Unauthorized data change.';
  END IF;
END;$$
DELIMITER ;

-- ==============================
-- Extra Triggers
-- ==============================

-- Automatically creates a payment when a rental is created.
DELIMITER $$
DROP TRIGGER IF EXISTS create_payment_for_rental$$
CREATE TRIGGER create_payment_for_rental AFTER INSERT ON rental
FOR EACH ROW
BEGIN
  DECLARE l_show_type ENUM('FILM', 'EPISODE');
  DECLARE payment_amount DECIMAL(5, 2);

  IF (
    SELECT s.is_film FROM rental r
    LEFT JOIN inventory i on r.inventory_id = i.id
    LEFT JOIN `show` s on i.show_id = s.id
    WHERE r.id = NEW.id
  ) THEN
    SET l_show_type = 'FILM';
  ELSE
    SET l_show_type = 'EPISODE';
  END IF;

  CALL calculate_rental_price(NEW.customer_id, l_show_type, payment_amount);

  INSERT INTO payment (amount, customer_id, rental_id, created_at) VALUES
  (payment_amount, NEW.customer_id, NEW.id, NEW.created_at);
END;$$
DELIMITER ;
