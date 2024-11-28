CREATE TABLE IF NOT EXISTS public.files
(
    id uuid NOT NULL,
    name character varying(255) COLLATE pg_catalog."default",
    assistant_id uuid,
    CONSTRAINT files_pkey PRIMARY KEY (id),
    CONSTRAINT fketsig9ci33wy9qytwr8n59bbn FOREIGN KEY (assistant_id)
        REFERENCES public.assistant (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

    TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.files
    OWNER to postgres;