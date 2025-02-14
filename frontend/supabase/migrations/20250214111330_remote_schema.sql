create type "public"."enum_active_user_sessions_role" as enum ('user', 'superuser', 'admin');

create type "public"."enum_users_role" as enum ('user', 'superuser', 'admin');

create sequence "public"."active_podcaster_sessions_id_seq";

create sequence "public"."active_user_sessions_id_seq";

create sequence "public"."followings_id_seq";

create sequence "public"."podcasters_id_seq";

create sequence "public"."podcasts_id_seq";

create sequence "public"."subscriptions_id_seq";

create sequence "public"."users_id_seq";

create table "public"."active_podcaster_sessions" (
    "id" integer not null default nextval('active_podcaster_sessions_id_seq'::regclass),
    "token" character varying(255) not null,
    "podcaster_id" integer,
    "created_at" timestamp with time zone not null,
    "updated_at" timestamp with time zone not null
);


create table "public"."active_user_sessions" (
    "id" integer not null default nextval('active_user_sessions_id_seq'::regclass),
    "token" character varying(255) not null,
    "user_id" integer,
    "role" enum_active_user_sessions_role,
    "created_at" timestamp with time zone not null,
    "updated_at" timestamp with time zone not null
);


create table "public"."followings" (
    "id" integer not null default nextval('followings_id_seq'::regclass),
    "user_id" integer not null,
    "podcast_id" integer not null,
    "starred" boolean not null default false
);


create table "public"."migrations" (
    "name" character varying(255) not null
);


create table "public"."podcasters" (
    "id" integer not null default nextval('podcasters_id_seq'::regclass),
    "email" character varying(255) not null,
    "username" character varying(255) not null,
    "password" character varying(255) not null,
    "premium" boolean default false,
    "verified" boolean default false,
    "disabled" boolean default false,
    "links" text[],
    "about" text,
    "earnings" integer,
    "created_at" timestamp with time zone not null,
    "updated_at" timestamp with time zone not null,
    "subscriptioncount" integer not null default 0
);


create table "public"."podcasts" (
    "id" integer not null default nextval('podcasts_id_seq'::regclass),
    "name" text not null,
    "description" text,
    "urls" character varying(255)[] not null,
    "transcribed" boolean not null default false,
    "created_at" timestamp with time zone not null,
    "updated_at" timestamp with time zone not null,
    "podcaster_id" integer,
    "followcount" integer not null default 0
);


create table "public"."subscriptions" (
    "id" integer not null default nextval('subscriptions_id_seq'::regclass),
    "user_id" integer not null,
    "podcaster_id" integer not null,
    "paid" boolean not null default false,
    "stipend" integer not null default 0,
    "frozen" boolean not null default false,
    "comments" character varying(255)[]
);


create table "public"."users" (
    "id" integer not null default nextval('users_id_seq'::regclass),
    "email" character varying(255) not null,
    "username" character varying(255) not null,
    "password" character varying(255) not null,
    "verified" boolean default false,
    "disabled" boolean default false,
    "role" enum_users_role,
    "avatar_url" character varying(255),
    "about" text,
    "balance" integer,
    "created_at" timestamp with time zone not null,
    "updated_at" timestamp with time zone not null,
    "podcaster_id" integer,
    "podcast_id" integer
);


alter sequence "public"."active_podcaster_sessions_id_seq" owned by "public"."active_podcaster_sessions"."id";

alter sequence "public"."active_user_sessions_id_seq" owned by "public"."active_user_sessions"."id";

alter sequence "public"."followings_id_seq" owned by "public"."followings"."id";

alter sequence "public"."podcasters_id_seq" owned by "public"."podcasters"."id";

alter sequence "public"."podcasts_id_seq" owned by "public"."podcasts"."id";

alter sequence "public"."subscriptions_id_seq" owned by "public"."subscriptions"."id";

alter sequence "public"."users_id_seq" owned by "public"."users"."id";

CREATE UNIQUE INDEX active_podcaster_sessions_pkey ON public.active_podcaster_sessions USING btree (id);

CREATE UNIQUE INDEX active_user_sessions_pkey ON public.active_user_sessions USING btree (id);

CREATE UNIQUE INDEX followings_pkey ON public.followings USING btree (id);

CREATE UNIQUE INDEX followings_user_id_podcast_id_key ON public.followings USING btree (user_id, podcast_id);

CREATE UNIQUE INDEX migrations_pkey ON public.migrations USING btree (name);

CREATE UNIQUE INDEX podcasters_email_key ON public.podcasters USING btree (email);

CREATE UNIQUE INDEX podcasters_pkey ON public.podcasters USING btree (id);

CREATE UNIQUE INDEX podcasts_pkey ON public.podcasts USING btree (id);

CREATE UNIQUE INDEX subscriptions_pkey ON public.subscriptions USING btree (id);

CREATE UNIQUE INDEX subscriptions_user_id_podcaster_id_key ON public.subscriptions USING btree (user_id, podcaster_id);

CREATE UNIQUE INDEX users_email_key ON public.users USING btree (email);

CREATE UNIQUE INDEX users_pkey ON public.users USING btree (id);

alter table "public"."active_podcaster_sessions" add constraint "active_podcaster_sessions_pkey" PRIMARY KEY using index "active_podcaster_sessions_pkey";

alter table "public"."active_user_sessions" add constraint "active_user_sessions_pkey" PRIMARY KEY using index "active_user_sessions_pkey";

alter table "public"."followings" add constraint "followings_pkey" PRIMARY KEY using index "followings_pkey";

alter table "public"."migrations" add constraint "migrations_pkey" PRIMARY KEY using index "migrations_pkey";

alter table "public"."podcasters" add constraint "podcasters_pkey" PRIMARY KEY using index "podcasters_pkey";

alter table "public"."podcasts" add constraint "podcasts_pkey" PRIMARY KEY using index "podcasts_pkey";

alter table "public"."subscriptions" add constraint "subscriptions_pkey" PRIMARY KEY using index "subscriptions_pkey";

alter table "public"."users" add constraint "users_pkey" PRIMARY KEY using index "users_pkey";

alter table "public"."active_podcaster_sessions" add constraint "active_podcaster_sessions_podcaster_id_fkey" FOREIGN KEY (podcaster_id) REFERENCES podcasters(id) ON UPDATE CASCADE ON DELETE SET NULL not valid;

alter table "public"."active_podcaster_sessions" validate constraint "active_podcaster_sessions_podcaster_id_fkey";

alter table "public"."active_user_sessions" add constraint "active_user_sessions_user_id_fkey" FOREIGN KEY (user_id) REFERENCES users(id) ON UPDATE CASCADE ON DELETE SET NULL not valid;

alter table "public"."active_user_sessions" validate constraint "active_user_sessions_user_id_fkey";

alter table "public"."followings" add constraint "followings_podcast_id_fkey" FOREIGN KEY (podcast_id) REFERENCES podcasts(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."followings" validate constraint "followings_podcast_id_fkey";

alter table "public"."followings" add constraint "followings_user_id_fkey" FOREIGN KEY (user_id) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."followings" validate constraint "followings_user_id_fkey";

alter table "public"."followings" add constraint "followings_user_id_podcast_id_key" UNIQUE using index "followings_user_id_podcast_id_key";

alter table "public"."podcasters" add constraint "podcasters_email_key" UNIQUE using index "podcasters_email_key";

alter table "public"."podcasts" add constraint "podcasts_podcaster_id_fkey" FOREIGN KEY (podcaster_id) REFERENCES podcasters(id) ON UPDATE CASCADE ON DELETE SET NULL not valid;

alter table "public"."podcasts" validate constraint "podcasts_podcaster_id_fkey";

alter table "public"."subscriptions" add constraint "subscriptions_podcaster_id_fkey" FOREIGN KEY (podcaster_id) REFERENCES podcasters(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."subscriptions" validate constraint "subscriptions_podcaster_id_fkey";

alter table "public"."subscriptions" add constraint "subscriptions_user_id_fkey" FOREIGN KEY (user_id) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."subscriptions" validate constraint "subscriptions_user_id_fkey";

alter table "public"."subscriptions" add constraint "subscriptions_user_id_podcaster_id_key" UNIQUE using index "subscriptions_user_id_podcaster_id_key";

alter table "public"."users" add constraint "users_email_key" UNIQUE using index "users_email_key";

alter table "public"."users" add constraint "users_podcast_id_fkey" FOREIGN KEY (podcast_id) REFERENCES podcasts(id) not valid;

alter table "public"."users" validate constraint "users_podcast_id_fkey";

alter table "public"."users" add constraint "users_podcaster_id_fkey" FOREIGN KEY (podcaster_id) REFERENCES podcasters(id) not valid;

alter table "public"."users" validate constraint "users_podcaster_id_fkey";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.sync_user_to_custom_table()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
BEGIN
  
  INSERT INTO users (id, username, created_at)
  VALUES (NEW.id, NEW.email, NEW.created_at)  
  ON CONFLICT (id) DO UPDATE
  SET username = NEW.email;  

  RETURN NEW;
END;
$function$
;

grant delete on table "public"."active_podcaster_sessions" to "anon";

grant insert on table "public"."active_podcaster_sessions" to "anon";

grant references on table "public"."active_podcaster_sessions" to "anon";

grant select on table "public"."active_podcaster_sessions" to "anon";

grant trigger on table "public"."active_podcaster_sessions" to "anon";

grant truncate on table "public"."active_podcaster_sessions" to "anon";

grant update on table "public"."active_podcaster_sessions" to "anon";

grant delete on table "public"."active_podcaster_sessions" to "authenticated";

grant insert on table "public"."active_podcaster_sessions" to "authenticated";

grant references on table "public"."active_podcaster_sessions" to "authenticated";

grant select on table "public"."active_podcaster_sessions" to "authenticated";

grant trigger on table "public"."active_podcaster_sessions" to "authenticated";

grant truncate on table "public"."active_podcaster_sessions" to "authenticated";

grant update on table "public"."active_podcaster_sessions" to "authenticated";

grant delete on table "public"."active_podcaster_sessions" to "service_role";

grant insert on table "public"."active_podcaster_sessions" to "service_role";

grant references on table "public"."active_podcaster_sessions" to "service_role";

grant select on table "public"."active_podcaster_sessions" to "service_role";

grant trigger on table "public"."active_podcaster_sessions" to "service_role";

grant truncate on table "public"."active_podcaster_sessions" to "service_role";

grant update on table "public"."active_podcaster_sessions" to "service_role";

grant delete on table "public"."active_user_sessions" to "anon";

grant insert on table "public"."active_user_sessions" to "anon";

grant references on table "public"."active_user_sessions" to "anon";

grant select on table "public"."active_user_sessions" to "anon";

grant trigger on table "public"."active_user_sessions" to "anon";

grant truncate on table "public"."active_user_sessions" to "anon";

grant update on table "public"."active_user_sessions" to "anon";

grant delete on table "public"."active_user_sessions" to "authenticated";

grant insert on table "public"."active_user_sessions" to "authenticated";

grant references on table "public"."active_user_sessions" to "authenticated";

grant select on table "public"."active_user_sessions" to "authenticated";

grant trigger on table "public"."active_user_sessions" to "authenticated";

grant truncate on table "public"."active_user_sessions" to "authenticated";

grant update on table "public"."active_user_sessions" to "authenticated";

grant delete on table "public"."active_user_sessions" to "service_role";

grant insert on table "public"."active_user_sessions" to "service_role";

grant references on table "public"."active_user_sessions" to "service_role";

grant select on table "public"."active_user_sessions" to "service_role";

grant trigger on table "public"."active_user_sessions" to "service_role";

grant truncate on table "public"."active_user_sessions" to "service_role";

grant update on table "public"."active_user_sessions" to "service_role";

grant delete on table "public"."followings" to "anon";

grant insert on table "public"."followings" to "anon";

grant references on table "public"."followings" to "anon";

grant select on table "public"."followings" to "anon";

grant trigger on table "public"."followings" to "anon";

grant truncate on table "public"."followings" to "anon";

grant update on table "public"."followings" to "anon";

grant delete on table "public"."followings" to "authenticated";

grant insert on table "public"."followings" to "authenticated";

grant references on table "public"."followings" to "authenticated";

grant select on table "public"."followings" to "authenticated";

grant trigger on table "public"."followings" to "authenticated";

grant truncate on table "public"."followings" to "authenticated";

grant update on table "public"."followings" to "authenticated";

grant delete on table "public"."followings" to "service_role";

grant insert on table "public"."followings" to "service_role";

grant references on table "public"."followings" to "service_role";

grant select on table "public"."followings" to "service_role";

grant trigger on table "public"."followings" to "service_role";

grant truncate on table "public"."followings" to "service_role";

grant update on table "public"."followings" to "service_role";

grant delete on table "public"."migrations" to "anon";

grant insert on table "public"."migrations" to "anon";

grant references on table "public"."migrations" to "anon";

grant select on table "public"."migrations" to "anon";

grant trigger on table "public"."migrations" to "anon";

grant truncate on table "public"."migrations" to "anon";

grant update on table "public"."migrations" to "anon";

grant delete on table "public"."migrations" to "authenticated";

grant insert on table "public"."migrations" to "authenticated";

grant references on table "public"."migrations" to "authenticated";

grant select on table "public"."migrations" to "authenticated";

grant trigger on table "public"."migrations" to "authenticated";

grant truncate on table "public"."migrations" to "authenticated";

grant update on table "public"."migrations" to "authenticated";

grant delete on table "public"."migrations" to "service_role";

grant insert on table "public"."migrations" to "service_role";

grant references on table "public"."migrations" to "service_role";

grant select on table "public"."migrations" to "service_role";

grant trigger on table "public"."migrations" to "service_role";

grant truncate on table "public"."migrations" to "service_role";

grant update on table "public"."migrations" to "service_role";

grant delete on table "public"."podcasters" to "anon";

grant insert on table "public"."podcasters" to "anon";

grant references on table "public"."podcasters" to "anon";

grant select on table "public"."podcasters" to "anon";

grant trigger on table "public"."podcasters" to "anon";

grant truncate on table "public"."podcasters" to "anon";

grant update on table "public"."podcasters" to "anon";

grant delete on table "public"."podcasters" to "authenticated";

grant insert on table "public"."podcasters" to "authenticated";

grant references on table "public"."podcasters" to "authenticated";

grant select on table "public"."podcasters" to "authenticated";

grant trigger on table "public"."podcasters" to "authenticated";

grant truncate on table "public"."podcasters" to "authenticated";

grant update on table "public"."podcasters" to "authenticated";

grant delete on table "public"."podcasters" to "service_role";

grant insert on table "public"."podcasters" to "service_role";

grant references on table "public"."podcasters" to "service_role";

grant select on table "public"."podcasters" to "service_role";

grant trigger on table "public"."podcasters" to "service_role";

grant truncate on table "public"."podcasters" to "service_role";

grant update on table "public"."podcasters" to "service_role";

grant delete on table "public"."podcasts" to "anon";

grant insert on table "public"."podcasts" to "anon";

grant references on table "public"."podcasts" to "anon";

grant select on table "public"."podcasts" to "anon";

grant trigger on table "public"."podcasts" to "anon";

grant truncate on table "public"."podcasts" to "anon";

grant update on table "public"."podcasts" to "anon";

grant delete on table "public"."podcasts" to "authenticated";

grant insert on table "public"."podcasts" to "authenticated";

grant references on table "public"."podcasts" to "authenticated";

grant select on table "public"."podcasts" to "authenticated";

grant trigger on table "public"."podcasts" to "authenticated";

grant truncate on table "public"."podcasts" to "authenticated";

grant update on table "public"."podcasts" to "authenticated";

grant delete on table "public"."podcasts" to "service_role";

grant insert on table "public"."podcasts" to "service_role";

grant references on table "public"."podcasts" to "service_role";

grant select on table "public"."podcasts" to "service_role";

grant trigger on table "public"."podcasts" to "service_role";

grant truncate on table "public"."podcasts" to "service_role";

grant update on table "public"."podcasts" to "service_role";

grant delete on table "public"."subscriptions" to "anon";

grant insert on table "public"."subscriptions" to "anon";

grant references on table "public"."subscriptions" to "anon";

grant select on table "public"."subscriptions" to "anon";

grant trigger on table "public"."subscriptions" to "anon";

grant truncate on table "public"."subscriptions" to "anon";

grant update on table "public"."subscriptions" to "anon";

grant delete on table "public"."subscriptions" to "authenticated";

grant insert on table "public"."subscriptions" to "authenticated";

grant references on table "public"."subscriptions" to "authenticated";

grant select on table "public"."subscriptions" to "authenticated";

grant trigger on table "public"."subscriptions" to "authenticated";

grant truncate on table "public"."subscriptions" to "authenticated";

grant update on table "public"."subscriptions" to "authenticated";

grant delete on table "public"."subscriptions" to "service_role";

grant insert on table "public"."subscriptions" to "service_role";

grant references on table "public"."subscriptions" to "service_role";

grant select on table "public"."subscriptions" to "service_role";

grant trigger on table "public"."subscriptions" to "service_role";

grant truncate on table "public"."subscriptions" to "service_role";

grant update on table "public"."subscriptions" to "service_role";

grant delete on table "public"."users" to "anon";

grant insert on table "public"."users" to "anon";

grant references on table "public"."users" to "anon";

grant select on table "public"."users" to "anon";

grant trigger on table "public"."users" to "anon";

grant truncate on table "public"."users" to "anon";

grant update on table "public"."users" to "anon";

grant delete on table "public"."users" to "authenticated";

grant insert on table "public"."users" to "authenticated";

grant references on table "public"."users" to "authenticated";

grant select on table "public"."users" to "authenticated";

grant trigger on table "public"."users" to "authenticated";

grant truncate on table "public"."users" to "authenticated";

grant update on table "public"."users" to "authenticated";

grant delete on table "public"."users" to "service_role";

grant insert on table "public"."users" to "service_role";

grant references on table "public"."users" to "service_role";

grant select on table "public"."users" to "service_role";

grant trigger on table "public"."users" to "service_role";

grant truncate on table "public"."users" to "service_role";

grant update on table "public"."users" to "service_role";


