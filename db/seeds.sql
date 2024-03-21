INSERT INTO departments (department_name)
VALUES 
('Womens Shoes'),
('Cosmetics'),
('Visuals'),
('Customer Experience'),
('Alterations');


INSERT INTO roles (title, salary, department_id)
VALUES 
('Sales Associate', 50000.00, 1),
('Makeup Artist', 60000.00, 2),
('Visual Merchandiser', 80000.00, 3),
('Order Fulfillment', 45000.00, 4),
('Tailor', 85000.00, 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
('Hayley', 'Thompson', 1, 1),
('Park', 'Seonghwa', 1, 1),
('Jade', 'Peterson', 2, 2),
('Adam', 'Driver', 2, 2),
('Jeon', 'Jungkook', 3, 3),
('Thomas', 'Garcia', 3, 3),
('Christopher', 'Bangchan', 4, 4),
('Hwang', 'Hyunjin', 4, 4),
('Felix', 'Lee', 5, 5),
('Freddy', 'Fazbear', 5, 5);