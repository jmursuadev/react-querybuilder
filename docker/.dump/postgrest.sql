create role web_anon nologin;
grant usage on schema public to web_anon;
grant select on public.users to web_anon;
grant select on public.instruments to web_anon;

create role authenticator noinherit login password 'password';
grant web_anon to authenticator;