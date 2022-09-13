create table user(
    id int primary key Auto_Increment,
    name varchar(250),
    contactNumber varchar(20),
    email varchar(50),
    password varchar(250),
    status varchar(20),
    role varchar(20),
    UNIQUE (email)
    );

    insert into user(name,contactNumber,email,password,status,role)values('Admin','9988461939','vinaybhandari@nextgenapps.in','123456','true','admin');

    create table category(
        id int NOT NULL Auto_Increment,
        name varchar(250) NOT NULL,
        primary key(id)
    );