CREATE TABLE data (
    ticket_id INT,
    created_date DATE,
    price FLOAT,
    sold_to VARCHAR(40),
    hash VARCHAR(64),
    is_sold INT,
    sold_date DATE,
    transaction_hash VARCHAR(60)
);

CREATE TABLE reseller (
    name VARCHAR(40),
    password VARCHAR(255), -- You should use appropriate length and hashing for passwords
    tez_account VARCHAR(40),
    created_date DATE
);
