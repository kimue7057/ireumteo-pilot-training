-- Adds optional program metadata for reusable apply flows.
-- Existing rows stay valid, and legacy rows without program_id keep their global uniqueness
-- through the coalesce() value used in the replacement unique index below.

alter table if exists public.applications
  add column if not exists program_id text,
  add column if not exists program_title text,
  add column if not exists program_type text,
  add column if not exists source_page text;

drop index if exists public.applications_email_unique_idx;

create unique index if not exists applications_program_email_unique_idx
  on public.applications (coalesce(program_id, 'legacy-general'), lower(email));
