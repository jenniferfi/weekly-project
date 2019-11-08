CREATE TABLE topic (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    description VARCHAR(255),
    timetomaster INT,
    timespent INT,
    source VARCHAR(255),
    startlearningdate DATE,
    inprogress BOOLEAN,
    completiondate DATE
);