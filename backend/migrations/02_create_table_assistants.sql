CREATE TABLE IF NOT EXISTS public.assistant
(
    id uuid NOT NULL,
    customize character varying(100000) COLLATE pg_catalog."default",
    message character varying(255) COLLATE pg_catalog."default",
    name character varying(255) COLLATE pg_catalog."default",
    user_id uuid,
    CONSTRAINT assistant_pkey PRIMARY KEY (id),
    CONSTRAINT fkoej4yeee5odw5q4c5wnpkn28i FOREIGN KEY (user_id)
        REFERENCES public.users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

    TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.assistant
    OWNER to postgres;