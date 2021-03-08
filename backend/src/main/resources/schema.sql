SET DB_CLOSE_DELAY -1;         
;              
CREATE USER IF NOT EXISTS SA SALT '76e1609ada261af1' HASH '10badc86767d847d263a419677feeef0c56739700d2b9bbd26f3caf4d83cfe9c' ADMIN;            
CREATE SEQUENCE PUBLIC.SCHEDULE_SEQ START WITH 23;             
CREATE SEQUENCE PUBLIC.EMPLOYEES_SEQ START WITH 22;            
CREATE MEMORY TABLE PUBLIC.EMPLOYEES(
    ID BIGINT NOT NULL,
    NAME VARCHAR(255),
    INACTIVE VARCHAR(255)
);              
ALTER TABLE PUBLIC.EMPLOYEES ADD CONSTRAINT PUBLIC.CONSTRAINT_4 PRIMARY KEY(ID);               
-- 21 +/- SELECT COUNT(*) FROM PUBLIC.EMPLOYEES;               
INSERT INTO PUBLIC.EMPLOYEES(ID, NAME, INACTIVE) VALUES
(1, 'marissa', 'Y'),
(2, 'dylan', 'Y'),
(3, 'Kennedy', 'Y'),
(4, 'Gracie', 'Y'),
(5, 'A''ishea', 'Y'),
(6, 'Lindsey', 'Y'),
(7, 'Janiyah', 'Y'),
(8, 'Rebecca', 'Y'),
(9, 'Tyler', 'Y'),
(10, 'Caleb', 'Y'),
(11, 'Chase', 'Y'),
(12, 'A''ishea', 'N'),
(13, 'Caleb', 'N'),
(14, 'Chase', 'N'),
(15, 'Gracie', 'N'),
(16, 'Janiyah', 'N'),
(17, 'Kennedy', 'N'),
(18, 'Lindsey', 'N'),
(19, 'Marissa', 'N'),
(20, 'Rebecca', 'N'),
(21, 'Tyler', 'N'); 
CREATE MEMORY TABLE PUBLIC.SCHEDULE(
    ID BIGINT NOT NULL,
    EMPLOYEE_ID BIGINT,
    END_TIME TIMESTAMP,
    START_TIME TIMESTAMP
);       
ALTER TABLE PUBLIC.SCHEDULE ADD CONSTRAINT PUBLIC.CONSTRAINT_5 PRIMARY KEY(ID);
-- 17 +/- SELECT COUNT(*) FROM PUBLIC.SCHEDULE;
INSERT INTO PUBLIC.SCHEDULE(ID, EMPLOYEE_ID, END_TIME, START_TIME) VALUES
(1, 12, TIMESTAMP '2021-03-01 16:30:00', TIMESTAMP '2021-03-01 13:00:00'),
(2, 14, TIMESTAMP '2021-03-06 22:00:00', TIMESTAMP '2021-03-06 15:00:00'),
(3, 17, TIMESTAMP '2021-03-02 22:00:00', TIMESTAMP '2021-03-02 13:00:00'),
(6, 18, TIMESTAMP '2021-03-03 00:00:00', TIMESTAMP '2021-03-02 15:00:00'),
(7, 15, TIMESTAMP '2021-03-06 22:00:00', TIMESTAMP '2021-03-06 13:00:00'),
(8, 21, TIMESTAMP '2021-03-05 00:00:00', TIMESTAMP '2021-03-04 19:00:00'),
(10, 21, TIMESTAMP '2021-03-03 00:00:00', TIMESTAMP '2021-03-02 19:00:00'),
(12, 12, TIMESTAMP '2021-03-03 16:30:00', TIMESTAMP '2021-03-03 13:00:00'),
(13, 19, TIMESTAMP '2021-03-05 22:00:00', TIMESTAMP '2021-03-05 13:00:00'),
(14, 19, TIMESTAMP '2021-03-06 22:00:00', TIMESTAMP '2021-03-06 15:00:00'),
(15, 14, TIMESTAMP '2021-03-02 00:00:00', TIMESTAMP '2021-03-01 16:30:00'),
(16, 15, TIMESTAMP '2021-03-06 00:00:00', TIMESTAMP '2021-03-05 15:00:00'),
(17, 14, TIMESTAMP '2021-03-04 00:00:00', TIMESTAMP '2021-03-03 16:30:00'),
(18, 20, TIMESTAMP '2021-03-01 22:00:00', TIMESTAMP '2021-03-01 13:00:00'),
(19, 21, TIMESTAMP '2021-03-02 00:00:00', TIMESTAMP '2021-03-01 19:00:00'),
(21, 20, TIMESTAMP '2021-03-03 22:00:00', TIMESTAMP '2021-03-03 13:00:00'),
(22, 17, TIMESTAMP '2021-03-04 22:00:00', TIMESTAMP '2021-03-04 13:00:00');
