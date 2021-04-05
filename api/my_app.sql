DROP SCHEMA IF EXISTS my_app;
CREATE DATABASE IF NOT EXISTS my_app;
use my_app;

CREATE TABLE Restaurants (
	id_restaurants		INT NOT NULL PRIMARY KEY,
	restaurants	VARCHAR(150),
	address			VARCHAR(150),
	lat		FLOAT,
	lng		FLOAT,
    kind_food  SET('mexicano', 'vegetariano', 'oriental', 'italiano', 'catalano','mediterraneo', 'tapas'));
    
    
INSERT INTO `restaurants` (`id_restaurants`, `restaurants`, `address`, `lat`, `lng`, `kind_food`) VALUES
('1', 'La Taqueria', 'Carrer de Pujades, 172, 08005 Barcelona, ', 41.40192, 2.19952, 'mexicano'),
('2', 'Luigi Ristorante', 'Carrer Roger de Lluria 50, 08009 Barcelona', 41.39310, 2.16959, 'mediterraneo,italiano'),
('3', 'Bar Lobo', 'Carrer del Pintor Fortuny 3, 08001 Barcelona', 41.38353, 2.17060, 'mediterraneo,tapas'),
('4', 'Pikio Taco ', 'Carrer de Corsega 376, 08037 Barcelona', 41.39922, 2.16288, 'mexicano,tapas'),
('5', 'Ta Mi', 'Carrer de Napoles 229, 08013 Barcelona', 41.40046, 2.17252, 'oriental'),
('6', 'Bar Celta Pulperia', 'Carrer Simon Oller 3, 0802 Barcelona', 41.38009, 2.180003, 'tapas'),
('7', 'El Sortidor de la Filomena Pages', 'Placa del Sortidor 5, 08004 Barcelona', 41.37269, 2.16204, 'tapas'),
('8', 'Cerveceria Catalana', 'Carrer de Mallorca 236, 08008 Barcelona', 41.39246, 2.16070, 'catalano,tapas'),
('9', 'Shingane', 'Carrer de Calabria 232, 08029 Barcelona', 41.38613, 2.14703, 'oriental'),
('10', 'Vegesana', 'Carrer d Aribau, 14 08011 Barcelona', 41.38651, 2.16234, 'tapas,vegetariano');