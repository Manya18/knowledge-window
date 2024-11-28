CREATE TABLE IF NOT EXISTS public.users
(
    id uuid NOT NULL,
    email character varying(255) COLLATE pg_catalog.default,
    first_name character varying(255) COLLATE pg_catalog.default,
    password character varying(255) COLLATE pg_catalog.default,
    surname character varying(255) COLLATE pg_catalog.default,
    username character varying(255) COLLATE pg_catalog.default,
    CONSTRAINT users_pkey PRIMARY KEY (id),
    CONSTRAINT uk6dotkott2kjsp8vw4d0m25fb7 UNIQUE (email),
    CONSTRAINT ukr43af9ap4edm43mmtq01oddj6 UNIQUE (username)
)

    TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.users
    OWNER to postgres;