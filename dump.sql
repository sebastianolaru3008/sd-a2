--
-- PostgreSQL database dump
--

-- Dumped from database version 14.2
-- Dumped by pg_dump version 14.2

-- Started on 2022-04-18 03:52:58 EEST

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 3654 (class 1262 OID 16395)
-- Name: sd2; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE sd2 WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'C';


ALTER DATABASE sd2 OWNER TO postgres;

\connect sd2

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 213 (class 1259 OID 24711)
-- Name: food; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.food (
    id character varying(255) NOT NULL,
    category integer,
    description character varying(255),
    name character varying(255),
    price double precision,
    restaurant_id character varying(255) NOT NULL
);


ALTER TABLE public.food OWNER TO postgres;

--
-- TOC entry 209 (class 1259 OID 24637)
-- Name: order_sequence; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.order_sequence
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.order_sequence OWNER TO postgres;

--
-- TOC entry 214 (class 1259 OID 24718)
-- Name: ordered_food; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.ordered_food (
    id character varying(255) NOT NULL,
    quantity integer,
    food_id character varying(255),
    order_id character varying(255)
);


ALTER TABLE public.ordered_food OWNER TO postgres;

--
-- TOC entry 210 (class 1259 OID 24638)
-- Name: ordered_food_sequence; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.ordered_food_sequence
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.ordered_food_sequence OWNER TO postgres;

--
-- TOC entry 215 (class 1259 OID 24725)
-- Name: orders; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.orders (
    id character varying(255) NOT NULL,
    order_status integer,
    customer_id character varying(255),
    restaurant_id character varying(255)
);


ALTER TABLE public.orders OWNER TO postgres;

--
-- TOC entry 216 (class 1259 OID 24732)
-- Name: restaurant; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.restaurant (
    id character varying(255) NOT NULL,
    location character varying(255),
    name character varying(255),
    admin_id character varying(255)
);


ALTER TABLE public.restaurant OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 24739)
-- Name: restaurant_foods; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.restaurant_foods (
    restaurant_id character varying(255) NOT NULL,
    foods_id character varying(255) NOT NULL
);


ALTER TABLE public.restaurant_foods OWNER TO postgres;

--
-- TOC entry 218 (class 1259 OID 24744)
-- Name: restaurant_orders; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.restaurant_orders (
    restaurant_id character varying(255) NOT NULL,
    orders_id character varying(255) NOT NULL
);


ALTER TABLE public.restaurant_orders OWNER TO postgres;

--
-- TOC entry 211 (class 1259 OID 24639)
-- Name: restaurant_sequence; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.restaurant_sequence
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.restaurant_sequence OWNER TO postgres;

--
-- TOC entry 212 (class 1259 OID 24640)
-- Name: user_sequence; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.user_sequence
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.user_sequence OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 24749)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    dtype character varying(31) NOT NULL,
    id character varying(255) NOT NULL,
    email character varying(255),
    password_hash character varying(255)
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 220 (class 1259 OID 24756)
-- Name: users_orders; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users_orders (
    customer_id character varying(255) NOT NULL,
    orders_id character varying(255) NOT NULL
);


ALTER TABLE public.users_orders OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 32795)
-- Name: users_restaurants; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users_restaurants (
    admin_id character varying(255) NOT NULL,
    restaurants_id character varying(255) NOT NULL
);


ALTER TABLE public.users_restaurants OWNER TO postgres;

--
-- TOC entry 3640 (class 0 OID 24711)
-- Dependencies: 213
-- Data for Name: food; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.food (id, category, description, name, price, restaurant_id) VALUES ('4afe33be-f7e6-42c5-af77-5339ecfbd461', 0, '350g (mixed salad, avocado, feta, cashews, olive oil)
', 'Avocado salad with feta', 38, '1bf190da-658c-4dfc-a230-05866b8b6573');
INSERT INTO public.food (id, category, description, name, price, restaurant_id) VALUES ('ffbe7dbe-e222-413f-9324-ad677d2fba46', 0, '350g (salad, tuna, capers, quail eggs, cherry dresses, carrots, corn, toned salsa dressing)
', 'Tuna salad', 37, '1bf190da-658c-4dfc-a230-05866b8b6573');


--
-- TOC entry 3641 (class 0 OID 24718)
-- Dependencies: 214
-- Data for Name: ordered_food; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 3642 (class 0 OID 24725)
-- Dependencies: 215
-- Data for Name: orders; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 3643 (class 0 OID 24732)
-- Dependencies: 216
-- Data for Name: restaurant; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.restaurant (id, location, name, admin_id) VALUES ('1bf190da-658c-4dfc-a230-05866b8b6573', 'Str. Regele Ferdinand 22-26', 'Klausen Burger Brewery', '7066043a-a60d-4319-be95-6e00b146c85e');
INSERT INTO public.restaurant (id, location, name, admin_id) VALUES ('d9ea4fa8-0126-43c4-b001-f8613fed9da0', 'Padurii 13 Cluj-Napoca', '20 Pizza', 'a8cdecf8-df92-4705-b9c9-ead67f2bf71d');


--
-- TOC entry 3644 (class 0 OID 24739)
-- Dependencies: 217
-- Data for Name: restaurant_foods; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.restaurant_foods (restaurant_id, foods_id) VALUES ('1bf190da-658c-4dfc-a230-05866b8b6573', '4afe33be-f7e6-42c5-af77-5339ecfbd461');
INSERT INTO public.restaurant_foods (restaurant_id, foods_id) VALUES ('1bf190da-658c-4dfc-a230-05866b8b6573', 'ffbe7dbe-e222-413f-9324-ad677d2fba46');


--
-- TOC entry 3645 (class 0 OID 24744)
-- Dependencies: 218
-- Data for Name: restaurant_orders; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 3646 (class 0 OID 24749)
-- Dependencies: 219
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.users (dtype, id, email, password_hash) VALUES ('Admin', '7066043a-a60d-4319-be95-6e00b146c85e', 'admin@email.com', '$2a$10$egFO74T8j483H0FS3BMNPON6qhXKIsc4rsy4s64QRJ4HGqQlUZKyu');
INSERT INTO public.users (dtype, id, email, password_hash) VALUES ('Customer', 'e902e2f5-afcb-47d0-9be5-5065dfc5c2ea', 'tabi@sd.com', '$2a$10$/nRfSM86VvFIeJV2hA4RZum.lzL.JN4HvuheYUB3GPAAOdn0J..4S');
INSERT INTO public.users (dtype, id, email, password_hash) VALUES ('Admin', '2b8f9393-8768-4249-be45-d55c160e9630', 'admin2@email.com', '$2a$10$8vjaMIvyqqUG8.pMFG1JDuIZZeEkUpfYLYWAcRmCATVoKmvi4Mqje');
INSERT INTO public.users (dtype, id, email, password_hash) VALUES ('Admin', 'a8cdecf8-df92-4705-b9c9-ead67f2bf71d', 'admin1@email.com', '$2a$10$dfux4a3oxuTLja3ANAwh5.bh9AxDxpHGN3pGxjIN0k1oYxFJMFwDC');


--
-- TOC entry 3647 (class 0 OID 24756)
-- Dependencies: 220
-- Data for Name: users_orders; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 3648 (class 0 OID 32795)
-- Dependencies: 221
-- Data for Name: users_restaurants; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.users_restaurants (admin_id, restaurants_id) VALUES ('7066043a-a60d-4319-be95-6e00b146c85e', '1bf190da-658c-4dfc-a230-05866b8b6573');
INSERT INTO public.users_restaurants (admin_id, restaurants_id) VALUES ('a8cdecf8-df92-4705-b9c9-ead67f2bf71d', 'd9ea4fa8-0126-43c4-b001-f8613fed9da0');


--
-- TOC entry 3655 (class 0 OID 0)
-- Dependencies: 209
-- Name: order_sequence; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.order_sequence', 1, false);


--
-- TOC entry 3656 (class 0 OID 0)
-- Dependencies: 210
-- Name: ordered_food_sequence; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.ordered_food_sequence', 1, false);


--
-- TOC entry 3657 (class 0 OID 0)
-- Dependencies: 211
-- Name: restaurant_sequence; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.restaurant_sequence', 1, false);


--
-- TOC entry 3658 (class 0 OID 0)
-- Dependencies: 212
-- Name: user_sequence; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.user_sequence', 2, true);


--
-- TOC entry 3466 (class 2606 OID 24717)
-- Name: food food_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.food
    ADD CONSTRAINT food_pkey PRIMARY KEY (id);


--
-- TOC entry 3468 (class 2606 OID 24724)
-- Name: ordered_food ordered_food_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ordered_food
    ADD CONSTRAINT ordered_food_pkey PRIMARY KEY (id);


--
-- TOC entry 3470 (class 2606 OID 24731)
-- Name: orders orders_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_pkey PRIMARY KEY (id);


--
-- TOC entry 3472 (class 2606 OID 24738)
-- Name: restaurant restaurant_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.restaurant
    ADD CONSTRAINT restaurant_pkey PRIMARY KEY (id);


--
-- TOC entry 3480 (class 2606 OID 24771)
-- Name: users_orders uk_1njdfitph68mh7p7c6f3qc736; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users_orders
    ADD CONSTRAINT uk_1njdfitph68mh7p7c6f3qc736 UNIQUE (orders_id);


--
-- TOC entry 3482 (class 2606 OID 32801)
-- Name: users_restaurants uk_8h27sv3t26a2rsk4op3x43la7; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users_restaurants
    ADD CONSTRAINT uk_8h27sv3t26a2rsk4op3x43la7 UNIQUE (restaurants_id);


--
-- TOC entry 3476 (class 2606 OID 24769)
-- Name: restaurant_orders uk_d1dqp0i886vmn4ue9eggj0d8j; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.restaurant_orders
    ADD CONSTRAINT uk_d1dqp0i886vmn4ue9eggj0d8j UNIQUE (orders_id);


--
-- TOC entry 3474 (class 2606 OID 24767)
-- Name: restaurant_foods uk_jcui1ncguod9vfe1qbpksy46j; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.restaurant_foods
    ADD CONSTRAINT uk_jcui1ncguod9vfe1qbpksy46j UNIQUE (foods_id);


--
-- TOC entry 3478 (class 2606 OID 24755)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- TOC entry 3492 (class 2606 OID 24819)
-- Name: restaurant_orders fk21jwpdt4b37ymv5nkjjte0seg; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.restaurant_orders
    ADD CONSTRAINT fk21jwpdt4b37ymv5nkjjte0seg FOREIGN KEY (restaurant_id) REFERENCES public.restaurant(id);


--
-- TOC entry 3493 (class 2606 OID 24824)
-- Name: users_orders fk2lnf5jw8p8q0ytkr8dp0mlx6; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users_orders
    ADD CONSTRAINT fk2lnf5jw8p8q0ytkr8dp0mlx6 FOREIGN KEY (orders_id) REFERENCES public.orders(id);


--
-- TOC entry 3490 (class 2606 OID 24809)
-- Name: restaurant_foods fk4dbvvswitmtp26c2n425c9d12; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.restaurant_foods
    ADD CONSTRAINT fk4dbvvswitmtp26c2n425c9d12 FOREIGN KEY (restaurant_id) REFERENCES public.restaurant(id);


--
-- TOC entry 3485 (class 2606 OID 24784)
-- Name: ordered_food fk4o5ymem1aghd4echyvrr7e2m3; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ordered_food
    ADD CONSTRAINT fk4o5ymem1aghd4echyvrr7e2m3 FOREIGN KEY (order_id) REFERENCES public.orders(id);


--
-- TOC entry 3494 (class 2606 OID 24829)
-- Name: users_orders fk535gbkx5lnqoh2tinilnquojy; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users_orders
    ADD CONSTRAINT fk535gbkx5lnqoh2tinilnquojy FOREIGN KEY (customer_id) REFERENCES public.users(id);


--
-- TOC entry 3489 (class 2606 OID 24804)
-- Name: restaurant_foods fk546hh7nv85x4dl0aefekixbm6; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.restaurant_foods
    ADD CONSTRAINT fk546hh7nv85x4dl0aefekixbm6 FOREIGN KEY (foods_id) REFERENCES public.food(id);


--
-- TOC entry 3495 (class 2606 OID 32802)
-- Name: users_restaurants fk8pqqnjtabbpyn66pbvtbp8q37; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users_restaurants
    ADD CONSTRAINT fk8pqqnjtabbpyn66pbvtbp8q37 FOREIGN KEY (restaurants_id) REFERENCES public.restaurant(id);


--
-- TOC entry 3491 (class 2606 OID 24814)
-- Name: restaurant_orders fk8swg1vejobtj0ryb6fiwg264k; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.restaurant_orders
    ADD CONSTRAINT fk8swg1vejobtj0ryb6fiwg264k FOREIGN KEY (orders_id) REFERENCES public.orders(id);


--
-- TOC entry 3484 (class 2606 OID 24779)
-- Name: ordered_food fkbmd6kulwkrenlll0s6tblji6j; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ordered_food
    ADD CONSTRAINT fkbmd6kulwkrenlll0s6tblji6j FOREIGN KEY (food_id) REFERENCES public.food(id);


--
-- TOC entry 3487 (class 2606 OID 24794)
-- Name: orders fki7hgjxhw21nei3xgpe4nnpenh; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT fki7hgjxhw21nei3xgpe4nnpenh FOREIGN KEY (restaurant_id) REFERENCES public.restaurant(id);


--
-- TOC entry 3483 (class 2606 OID 24774)
-- Name: food fkm9xrxt95wwp1r2s7andom1l1c; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.food
    ADD CONSTRAINT fkm9xrxt95wwp1r2s7andom1l1c FOREIGN KEY (restaurant_id) REFERENCES public.restaurant(id);


--
-- TOC entry 3496 (class 2606 OID 32807)
-- Name: users_restaurants fknxioxhqspamncuuigg98hksny; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users_restaurants
    ADD CONSTRAINT fknxioxhqspamncuuigg98hksny FOREIGN KEY (admin_id) REFERENCES public.users(id);


--
-- TOC entry 3488 (class 2606 OID 24799)
-- Name: restaurant fkrk767nt9h14telxuh6tn5xff7; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.restaurant
    ADD CONSTRAINT fkrk767nt9h14telxuh6tn5xff7 FOREIGN KEY (admin_id) REFERENCES public.users(id);


--
-- TOC entry 3486 (class 2606 OID 24789)
-- Name: orders fksjfs85qf6vmcurlx43cnc16gy; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT fksjfs85qf6vmcurlx43cnc16gy FOREIGN KEY (customer_id) REFERENCES public.users(id);


-- Completed on 2022-04-18 03:52:59 EEST

--
-- PostgreSQL database dump complete
--

