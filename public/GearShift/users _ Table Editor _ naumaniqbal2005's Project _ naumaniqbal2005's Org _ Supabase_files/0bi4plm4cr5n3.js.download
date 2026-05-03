;!function(){try { var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof global?global:"undefined"!=typeof window?window:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&((e._debugIds|| (e._debugIds={}))[n]="40203eb0-55dd-fbac-9afd-6f80f8f98634")}catch(e){}}();
(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,479084,e=>{"use strict";let t=new Set(["AES128","AES256","ALL","ALLOWOVERWRITE","ANALYSE","ANALYZE","AND","ANY","ARRAY","AS","ASC","ASYMMETRIC","AUTHORIZATION","BACKUP","BETWEEN","BIGINT","BINARY","BIT","BLANKSASNULL","BOOLEAN","BOTH","BYTEDICT","CASE","CAST","CHAR","CHARACTER","CHECK","COALESCE","COLLATE","COLLATION","COLUMN","CONCURRENTLY","CONSTRAINT","CREATE","CREDENTIALS","CROSS","CURRENT_CATALOG","CURRENT_DATE","CURRENT_ROLE","CURRENT_SCHEMA","CURRENT_TIME","CURRENT_TIMESTAMP","CURRENT_USER_ID","CURRENT_USER","DEC","DECIMAL","DEFAULT","DEFERRABLE","DEFLATE","DEFRAG","DELETE","DELTA","DELTA32K","DESC","DISABLE","DISTINCT","DO","ELSE","EMPTYASNULL","ENABLE","ENCODE","ENCRYPT","ENCRYPTION","END","EXCEPT","EXISTS","EXPLICIT","EXTRACT","FALSE","FETCH","FLOAT","FOR","FOREIGN","FREEZE","FROM","FULL","GLOBALDICT256","GLOBALDICT64K","GRANT","GREATEST","GROUP","GROUPING","GZIP","HAVING","IDENTITY","IGNORE","ILIKE","IN","INITIALLY","INNER","INOUT","INSERT","INT","INTEGER","INTERSECT","INTERVAL","INTO","IS","ISNULL","JOIN","JSON_ARRAY","JSON_ARRAYAGG","JSON_EXISTS","JSON_OBJECT","JSON_OBJECTAGG","JSON_QUERY","JSON_SCALAR","JSON_SERIALIZE","JSON_TABLE","JSON_VALUE","JSON","LATERAL","LEADING","LEAST","LEFT","LIKE","LIMIT","LOCALTIME","LOCALTIMESTAMP","LUN","LUNS","LZO","LZOP","MERGE_ACTION","MINUS","MOSTLY13","MOSTLY32","MOSTLY8","NATIONAL","NATURAL","NCHAR","NEW","NONE","NORMALIZE","NOT","NOTNULL","NULL","NULLIF","NULLS","NUMERIC","OFF","OFFLINE","OFFSET","OLD","ON","ONLY","OPEN","OR","ORDER","OUT","OUTER","OVERLAPS","OVERLAY","PARALLEL","PARTITION","PERCENT","PLACING","POSITION","PRECISION","PRIMARY","RAW","READRATIO","REAL","RECOVER","REFERENCES","REJECTLOG","RESORT","RESTORE","RETURNING","RIGHT","ROW","SELECT","SESSION_USER","SETOF","SIMILAR","SMALLINT","SOME","SUBSTRING","SYMMETRIC","SYSDATE","SYSTEM_USER","SYSTEM","TABLE","TABLESAMPLE","TAG","TDES","TEXT255","TEXT32K","THEN","TIME","TIMESTAMP","TO","TOP","TRAILING","TREAT","TRIM","TRUE","TRUNCATECOLUMNS","UNION","UNIQUE","UPDATE","USER","USING","VALUES","VARCHAR","VARIADIC","VERBOSE","WALLET","WHEN","WHERE","WINDOW","WITH","WITHOUT","XMLATTRIBUTES","XMLCONCAT","XMLELEMENT","XMLEXISTS","XMLFOREST","XMLNAMESPACES","XMLPARSE","XMLPI","XMLROOT","XMLSERIALIZE","XMLTABLE"]);function a(e){return e.replace("T"," ").replace("Z","+00")}function n(e,t,a){let n="";for(let[i,r]of(n+=e?" (":"(",t.entries()))n+=(0===i?"":", ")+a(r);return n+")"}function i(e){if(null==e)throw Error("SQL identifier cannot be null or undefined");if(!1===e)return'"f"';if(!0===e)return'"t"';if(e instanceof Date)return`"${a(e.toISOString())}"`;if(Array.isArray(e)){let t=[];for(let a of e)if(!0===Array.isArray(a))throw TypeError("Nested array to grouped list conversion is not supported for SQL identifier");else t.push(i(a));return t.toString()}else if(e===Object(e))throw Error("SQL identifier cannot be an object");let n=String(e).slice(0);if(!0===/^[_a-z][\d$_a-z]*$/.test(n)&&!1==!!t.has(n.toUpperCase()))return n;let r='"';for(let e of n)r+='"'===e?e+e:e;return r+'"'}function r(e){let t,i="";if(null==e)return"NULL";if("bigint"==typeof e)return BigInt(e).toString();if(e===1/0)return"'Infinity'";if(e===-1/0)return"'-Infinity'";if(Number.isNaN(e))return"'NaN'";if("number"==typeof e)return Number(e).toString();if(!1===e)return"'f'";if(!0===e)return"'t'";if(e instanceof Date)return`'${a(e.toISOString())}'`;if(Array.isArray(e)){let t=[];for(let[a,i]of e.entries())!0===Array.isArray(i)?t.push(n(0!==a,i,r)):t.push(r(i));return t.toString()}e===Object(e)?(t="jsonb",i=JSON.stringify(e)):i=String(e).slice(0);let l=!1,s="'";for(let e of i)"'"===e?s+=e+e:"\\"===e?(s+=e+e,l=!0):s+=e;return s+="'",!0===l&&(s=`E${s}`),t&&(s+=`::${t}`),s}e.s(["format",0,function(e,...t){let l,s;return l=0,s=RegExp("%(%|(\\d+\\$)?[ILs])","g"),e.replace(s,(e,s)=>{if("%"===s)return"%";let o=l,c=s.split("$");if(c.length>1&&(o=Number.parseInt(c[0],10)-1,s=c[1]),o<0)throw Error("specified argument 0 but arguments start at 1");if(o>t.length-1)throw Error("too few arguments");return(l=o+1,"I"===s)?i(t[o]):"L"===s?r(t[o]):"s"===s?function e(t){if(null==t)return"";if(!1===t)return"f";if(!0===t)return"t";if(t instanceof Date)return a(t.toISOString());if(Array.isArray(t)){let a=[];for(let[i,r]of t.entries())null!=r&&(!0===Array.isArray(r)?a.push(n(0!==i,r,e)):a.push(e(r)));return a.toString()}return t===Object(t)?JSON.stringify(t):String(t).toString().slice(0)}(t[o]):void 0})},"ident",0,i,"joinSqlFragments",0,function(e,t){return e.join(t)},"keyword",0,function(e){if(!/^[A-Za-z][A-Za-z0-9_ ]*$/.test(e))throw Error(`Not a valid keyword: "${e}". Only letters, numbers, underscores, and spaces are permitted.`);return e},"literal",0,r,"safeSql",0,function(e,...t){return e.reduce((e,a,n)=>e+a+(t[n]??""),"")}],479084)},976876,761087,486603,981263,254873,198687,673351,784883,201049,557928,567205,912920,454430,330006,819615,211309,267655,58347,967533,e=>{"use strict";var t=e.i(97429),a=e.i(248593),n=e.i(479084);let i=(e,t)=>n.safeSql`
COALESCE(
  (
    SELECT
      array_agg(row_to_json(${(0,n.ident)(e)})) FILTER (WHERE ${t})
    FROM
      ${(0,n.ident)(e)}
  ),
  '{}'
) AS ${(0,n.ident)(e)}`;function r(e,t,a){return(a&&(t=a.concat(t??[])),e?.length)?n.safeSql`IN (${(0,n.joinSqlFragments)(e.map(n.literal),",")})`:t?.length?n.safeSql`NOT IN (${(0,n.joinSqlFragments)(t.map(n.literal),",")})`:n.safeSql``}let l=n.safeSql`
-- Lists each column's privileges in the form of:
--
-- [
--   {
--     "column_id": "12345.1",
--     "relation_schema": "public",
--     "relation_name": "mytable",
--     "column_name": "mycolumn",
--     "privileges": [
--       {
--         "grantor": "postgres",
--         "grantee": "myrole",
--         "privilege_type": "SELECT",
--         "is_grantable": false
--       },
--       ...
--     ]
--   },
--   ...
-- ]
--
-- Modified from information_schema.column_privileges. We try to be as close as
-- possible to the view definition, obtained from:
--
-- select pg_get_viewdef('information_schema.column_privileges');
--
-- The main differences are:
-- - we include column privileges for materialized views
--   (reason for exclusion in information_schema.column_privileges:
--    https://www.postgresql.org/message-id/9136.1502740844%40sss.pgh.pa.us)
-- - we query a.attrelid and a.attnum to generate column_id
-- - table_catalog is omitted
-- - table_schema -> relation_schema, table_name -> relation_name
--
-- Column privileges are intertwined with table privileges in that table
-- privileges override column privileges. E.g. if we do:
--
-- grant all on mytable to myrole;
--
-- Then myrole is granted privileges for ALL columns. Likewise, if we do:
--
-- grant all (id) on mytable to myrole;
-- revoke all on mytable from myrole;
--
-- Then the grant on the id column is revoked.
--
-- This is unlike how grants for schemas and tables interact, where you need
-- privileges for BOTH the schema the table is in AND the table itself in order
-- to access the table.

select (x.attrelid || '.' || x.attnum) as column_id,
       nc.nspname as relation_schema,
       x.relname as relation_name,
       x.attname as column_name,
       coalesce(
         jsonb_agg(
           jsonb_build_object(
             'grantor', u_grantor.rolname,
             'grantee', grantee.rolname,
             'privilege_type', x.prtype,
             'is_grantable', x.grantable
           )
         ),
         '[]'
       ) as privileges
from
  (select pr_c.grantor,
          pr_c.grantee,
          a.attrelid,
          a.attnum,
          a.attname,
          pr_c.relname,
          pr_c.relnamespace,
          pr_c.prtype,
          pr_c.grantable,
          pr_c.relowner
   from
     (select pg_class.oid,
             pg_class.relname,
             pg_class.relnamespace,
             pg_class.relowner,
             (aclexplode(coalesce(pg_class.relacl, acldefault('r', pg_class.relowner)))).grantor as grantor,
             (aclexplode(coalesce(pg_class.relacl, acldefault('r', pg_class.relowner)))).grantee as grantee,
             (aclexplode(coalesce(pg_class.relacl, acldefault('r', pg_class.relowner)))).privilege_type as privilege_type,
             (aclexplode(coalesce(pg_class.relacl, acldefault('r', pg_class.relowner)))).is_grantable as is_grantable
      from pg_class
      where (pg_class.relkind = any (array['r',
                                           'v',
                                           'm',
                                           'f',
                                           'p'])) ) pr_c(oid, relname, relnamespace, relowner, grantor, grantee, prtype, grantable),
                                                    pg_attribute a
   where ((a.attrelid = pr_c.oid)
          and (a.attnum > 0)
          and (not a.attisdropped))
   union select pr_a.grantor,
                pr_a.grantee,
                pr_a.attrelid,
                pr_a.attnum,
                pr_a.attname,
                c.relname,
                c.relnamespace,
                pr_a.prtype,
                pr_a.grantable,
                c.relowner
   from
     (select a.attrelid,
             a.attnum,
             a.attname,
             (aclexplode(coalesce(a.attacl, acldefault('c', cc.relowner)))).grantor as grantor,
             (aclexplode(coalesce(a.attacl, acldefault('c', cc.relowner)))).grantee as grantee,
             (aclexplode(coalesce(a.attacl, acldefault('c', cc.relowner)))).privilege_type as privilege_type,
             (aclexplode(coalesce(a.attacl, acldefault('c', cc.relowner)))).is_grantable as is_grantable
      from (pg_attribute a
            join pg_class cc on ((a.attrelid = cc.oid)))
      where ((a.attnum > 0)
             and (not a.attisdropped))) pr_a(attrelid, attnum, attname, grantor, grantee, prtype, grantable),
                                        pg_class c
   where ((pr_a.attrelid = c.oid)
          and (c.relkind = any (ARRAY['r',
                                      'v',
                                      'm',
                                      'f',
                                      'p'])))) x,
     pg_namespace nc,
     pg_authid u_grantor,
  (select pg_authid.oid,
          pg_authid.rolname
   from pg_authid
   union all select (0)::oid as oid,
                    'PUBLIC') grantee(oid, rolname)
where ((x.relnamespace = nc.oid)
       and (x.grantee = grantee.oid)
       and (x.grantor = u_grantor.oid)
       and (x.prtype = any (ARRAY['INSERT',
                                  'SELECT',
                                  'UPDATE',
                                  'REFERENCES']))
       and (pg_has_role(u_grantor.oid, 'USAGE')
            or pg_has_role(grantee.oid, 'USAGE')
            or (grantee.rolname = 'PUBLIC')))
group by column_id,
         nc.nspname,
         x.relname,
         x.attname
`,s=t.z.object({grantor:t.z.string(),grantee:t.z.string(),privilege_type:t.z.union([t.z.literal("SELECT"),t.z.literal("INSERT"),t.z.literal("UPDATE"),t.z.literal("REFERENCES")]),is_grantable:t.z.boolean()}),o=t.z.object({column_id:t.z.string(),relation_schema:t.z.string(),relation_name:t.z.string(),column_name:t.z.string(),privileges:t.z.array(s)}),c=t.z.array(o);t.z.object({columnId:t.z.string(),grantee:t.z.string(),privilegeType:t.z.union([t.z.literal("ALL"),t.z.literal("SELECT"),t.z.literal("INSERT"),t.z.literal("UPDATE"),t.z.literal("REFERENCES")]),isGrantable:t.z.boolean().optional()}),e.s(["default",0,{list:function({includeSystemSchemas:e=!1,includedSchemas:t,excludedSchemas:i,columnIds:s,limit:o,offset:d}={}){let _=n.safeSql`
  with column_privileges as (${l})
  select *
  from column_privileges
  `,p=[],m=r(t,i,e?void 0:a.DEFAULT_SYSTEM_SCHEMAS);return m&&p.push(n.safeSql`relation_schema ${m}`),s?.length&&p.push(n.safeSql`column_id in (${(0,n.joinSqlFragments)(s.map(n.literal),",")})`),p.length>0&&(_=n.safeSql`${_} where ${(0,n.joinSqlFragments)(p," and ")}`),o&&(_=n.safeSql`${_} limit ${(0,n.literal)(o)}`),d&&(_=n.safeSql`${_} offset ${(0,n.literal)(d)}`),{sql:_,zod:c}},grant:function(e){return{sql:n.safeSql`
do $$
declare
  col record;
begin
${(0,n.joinSqlFragments)(e.map(({privilegeType:e,columnId:t,grantee:a,isGrantable:i})=>{let[r,l]=t.split(".");return n.safeSql`
select *
from pg_attribute a
where a.attrelid = ${(0,n.literal)(r)}
  and a.attnum = ${(0,n.literal)(l)}
into col;
execute format(
  'grant ${(0,n.keyword)(e)} (%I) on %s to ${"public"===a.toLowerCase()?n.safeSql`public`:(0,n.ident)(a)} ${i?n.safeSql`with grant option`:n.safeSql``}',
  col.attname,
  col.attrelid::regclass
);`}),"\n")}
end $$;
`}},revoke:function(e){return{sql:n.safeSql`
do $$
declare
  col record;
begin
${(0,n.joinSqlFragments)(e.map(({privilegeType:e,columnId:t,grantee:a})=>{let[i,r]=t.split(".");return n.safeSql`
select *
from pg_attribute a
where a.attrelid = ${(0,n.literal)(i)}
  and a.attnum = ${(0,n.literal)(r)}
into col;
execute format(
  'revoke ${(0,n.keyword)(e)} (%I) on %s from ${"public"===a.toLowerCase()?n.safeSql`public`:(0,n.ident)(a)}',
  col.attname,
  col.attrelid::regclass
);`}),"\n")}
end $$;
`}},zod:o}],976876);let d=n.safeSql`
-- Adapted from information_schema.columns

SELECT
  c.oid :: int8 AS table_id,
  nc.nspname AS schema,
  c.relname AS table,
  (c.oid || '.' || a.attnum) AS id,
  a.attnum AS ordinal_position,
  a.attname AS name,
  CASE
    WHEN a.atthasdef THEN pg_get_expr(ad.adbin, ad.adrelid)
    ELSE NULL
  END AS default_value,
  CASE
    WHEN t.typtype = 'd' THEN CASE
      WHEN bt.typelem <> 0 :: oid
      AND bt.typlen = -1 THEN 'ARRAY'
      WHEN nbt.nspname = 'pg_catalog' THEN format_type(t.typbasetype, NULL)
      ELSE 'USER-DEFINED'
    END
    ELSE CASE
      WHEN t.typelem <> 0 :: oid
      AND t.typlen = -1 THEN 'ARRAY'
      WHEN nt.nspname = 'pg_catalog' THEN format_type(a.atttypid, NULL)
      ELSE 'USER-DEFINED'
    END
  END AS data_type,
  COALESCE(bt.typname, t.typname) AS format,
  a.attidentity IN ('a', 'd') AS is_identity,
  CASE
    a.attidentity
    WHEN 'a' THEN 'ALWAYS'
    WHEN 'd' THEN 'BY DEFAULT'
    ELSE NULL
  END AS identity_generation,
  a.attgenerated IN ('s') AS is_generated,
  NOT (
    a.attnotnull
    OR t.typtype = 'd' AND t.typnotnull
  ) AS is_nullable,
  (
    c.relkind IN ('r', 'p')
    OR c.relkind IN ('v', 'f') AND pg_column_is_updatable(c.oid, a.attnum, FALSE)
  ) AS is_updatable,
  uniques.table_id IS NOT NULL AS is_unique,
  check_constraints.definition AS "check",
  array_to_json(
    array(
      SELECT
        enumlabel
      FROM
        pg_catalog.pg_enum enums
      WHERE
        enums.enumtypid = coalesce(bt.oid, t.oid)
        OR enums.enumtypid = coalesce(bt.typelem, t.typelem)
      ORDER BY
        enums.enumsortorder
    )
  ) AS enums,
  col_description(c.oid, a.attnum) AS comment
FROM
  pg_attribute a
  LEFT JOIN pg_attrdef ad ON a.attrelid = ad.adrelid
  AND a.attnum = ad.adnum
  JOIN (
    pg_class c
    JOIN pg_namespace nc ON c.relnamespace = nc.oid
  ) ON a.attrelid = c.oid
  JOIN (
    pg_type t
    JOIN pg_namespace nt ON t.typnamespace = nt.oid
  ) ON a.atttypid = t.oid
  LEFT JOIN (
    pg_type bt
    JOIN pg_namespace nbt ON bt.typnamespace = nbt.oid
  ) ON t.typtype = 'd'
  AND t.typbasetype = bt.oid
  LEFT JOIN (
    SELECT DISTINCT ON (table_id, ordinal_position)
      conrelid AS table_id,
      conkey[1] AS ordinal_position
    FROM pg_catalog.pg_constraint
    WHERE contype = 'u' AND cardinality(conkey) = 1
  ) AS uniques ON uniques.table_id = c.oid AND uniques.ordinal_position = a.attnum
  LEFT JOIN (
    -- We only select the first column check
    SELECT DISTINCT ON (table_id, ordinal_position)
      conrelid AS table_id,
      conkey[1] AS ordinal_position,
      substring(
        pg_get_constraintdef(pg_constraint.oid, true),
        8,
        length(pg_get_constraintdef(pg_constraint.oid, true)) - 8
      ) AS "definition"
    FROM pg_constraint
    WHERE contype = 'c' AND cardinality(conkey) = 1
    ORDER BY table_id, ordinal_position, oid asc
  ) AS check_constraints ON check_constraints.table_id = c.oid AND check_constraints.ordinal_position = a.attnum
WHERE
  NOT pg_is_other_temp_schema(nc.oid)
  AND a.attnum > 0
  AND NOT a.attisdropped
  AND (c.relkind IN ('r', 'v', 'm', 'f', 'p'))
  AND (
    pg_has_role(c.relowner, 'USAGE')
    OR has_column_privilege(
      c.oid,
      a.attnum,
      'SELECT, INSERT, UPDATE, REFERENCES'
    )
  )
`,_=t.z.object({id:t.z.string(),table_id:t.z.number(),schema:t.z.string(),table:t.z.string(),name:t.z.string(),ordinal_position:t.z.number(),data_type:t.z.string(),format:t.z.string(),is_identity:t.z.boolean(),identity_generation:t.z.string().nullable(),is_generated:t.z.boolean(),is_nullable:t.z.boolean(),is_updatable:t.z.boolean(),is_unique:t.z.boolean(),check:t.z.string().nullable(),default_value:t.z.any().nullable(),enums:t.z.array(t.z.string()),comment:t.z.string().nullable()}),p=t.z.array(_),m=t.z.optional(_),E=e=>e.endsWith("[]")?`${(0,n.ident)(e.slice(0,-2))}[]`:e.includes(".")?e:(0,n.ident)(e);e.s(["default",0,{list:function({tableId:e,includeSystemSchemas:t=!1,includedSchemas:i,excludedSchemas:l,limit:s,offset:o}={}){let c=n.safeSql`
with
  columns as (${d})
select
  *
from
  columns
where
 true
`,_=r(i,l,t?void 0:a.DEFAULT_SYSTEM_SCHEMAS);return _&&(c=n.safeSql`${c} and schema ${_}`),void 0!==e&&(c=n.safeSql`${c} and table_id = ${(0,n.literal)(e)} `),s&&(c=n.safeSql`${c} limit ${(0,n.literal)(s)}`),o&&(c=n.safeSql`${c} offset ${(0,n.literal)(o)}`),{sql:c,zod:p}},retrieve:function(e){return{sql:n.safeSql`WITH columns AS (${d}) SELECT * FROM columns WHERE ${function(e){if("id"in e&&e.id)return n.safeSql`${(0,n.ident)("id")} = ${(0,n.literal)(e.id)}`;if("name"in e&&e.name&&e.schema&&e.table)return n.safeSql`schema = ${(0,n.literal)(e.schema)} AND ${(0,n.ident)("table")} = ${(0,n.literal)(e.table)} AND name = ${(0,n.literal)(e.name)}`;throw Error("Must provide either id or schema, name and table")}(e)};`,zod:m}},create:function({schema:e,table:t,name:a,type:i,default_value:r,default_value_format:l="literal",is_identity:s=!1,identity_generation:o="BY DEFAULT",is_nullable:c,is_primary_key:d=!1,is_unique:_=!1,comment:p,check:m,no_transaction:u=!1}){let f="";if(s){if(void 0!==r)throw Error("Columns cannot both be identity and have a default value");f=`GENERATED ${o} AS IDENTITY`}else void 0===r||(f="expression"===l?`DEFAULT ${r}`:`DEFAULT ${(0,n.literal)(r)}`);let g="";void 0!==c&&(g=c?"NULL":"NOT NULL");let S=void 0===m?"":`CHECK (${m})`,N=void 0===p?"":`COMMENT ON COLUMN ${(0,n.ident)(e)}.${(0,n.ident)(t)}.${(0,n.ident)(a)} IS ${(0,n.literal)(p)}`,b=`
  ALTER TABLE ${(0,n.ident)(e)}.${(0,n.ident)(t)} ADD COLUMN ${(0,n.ident)(a)} ${E(i)}
    ${f}
    ${g}
    ${d?"PRIMARY KEY":""}
    ${_?"UNIQUE":""}
    ${S};
  ${N};`;return u?{sql:b}:{sql:`
  BEGIN;
    ${b};
  COMMIT;`}},update:function(e,{name:t,type:a,drop_default:i=!1,default_value:r,default_value_format:l="literal",is_identity:s,identity_generation:o="BY DEFAULT",is_nullable:c,is_unique:d,comment:_,check:p}){let m,u,f=void 0===t||t===e.name?"":`ALTER TABLE ${(0,n.ident)(e.schema)}.${(0,n.ident)(e.table)} RENAME COLUMN ${(0,n.ident)(e.name)} TO ${(0,n.ident)(t)};`,g=void 0===a?"":`ALTER TABLE ${(0,n.ident)(e.schema)}.${(0,n.ident)(e.table)} ALTER COLUMN ${(0,n.ident)(e.name)} SET DATA TYPE ${E(a)} USING ${(0,n.ident)(e.name)}::${E(a)};`;if(i)m=`ALTER TABLE ${(0,n.ident)(e.schema)}.${(0,n.ident)(e.table)} ALTER COLUMN ${(0,n.ident)(e.name)} DROP DEFAULT;`;else if(void 0===r)m="";else{let t="expression"===l?r:(0,n.literal)(r);m=`ALTER TABLE ${(0,n.ident)(e.schema)}.${(0,n.ident)(e.table)} ALTER COLUMN ${(0,n.ident)(e.name)} SET DEFAULT ${t};`}let S=`ALTER TABLE ${(0,n.ident)(e.schema)}.${(0,n.ident)(e.table)} ALTER COLUMN ${(0,n.ident)(e.name)}`;!1===s?S+=" DROP IDENTITY IF EXISTS;":!0===e.is_identity?void 0===o?S="":S+=` SET GENERATED ${o};`:void 0===s?S="":S+=` ADD GENERATED ${o} AS IDENTITY;`,u=void 0===c?"":c?`ALTER TABLE ${(0,n.ident)(e.schema)}.${(0,n.ident)(e.table)} ALTER COLUMN ${(0,n.ident)(e.name)} DROP NOT NULL;`:`ALTER TABLE ${(0,n.ident)(e.schema)}.${(0,n.ident)(e.table)} ALTER COLUMN ${(0,n.ident)(e.name)} SET NOT NULL;`;let N="";!0===e.is_unique&&!1===d?N=`
DO $$
DECLARE
  r record;
BEGIN
  FOR r IN
    SELECT conname FROM pg_constraint WHERE
      contype = 'u'
      AND cardinality(conkey) = 1
      AND conrelid = ${(0,n.literal)(e.table_id)}
      AND conkey[1] = ${(0,n.literal)(e.ordinal_position)}
  LOOP
    EXECUTE ${(0,n.literal)(`ALTER TABLE ${(0,n.ident)(e.schema)}.${(0,n.ident)(e.table)} DROP CONSTRAINT `)} || quote_ident(r.conname);
  END LOOP;
END
$$;
`:!1===e.is_unique&&!0===d&&(N=`ALTER TABLE ${(0,n.ident)(e.schema)}.${(0,n.ident)(e.table)} ADD UNIQUE (${(0,n.ident)(e.name)});`);let b=void 0===_?"":`COMMENT ON COLUMN ${(0,n.ident)(e.schema)}.${(0,n.ident)(e.table)}.${(0,n.ident)(e.name)} IS ${(0,n.literal)(_)};`,T=void 0===p?"":`
DO $$
DECLARE
  v_conname name;
  v_conkey int2[];
BEGIN
  SELECT conname into v_conname FROM pg_constraint WHERE
    contype = 'c'
    AND cardinality(conkey) = 1
    AND conrelid = ${(0,n.literal)(e.table_id)}
    AND conkey[1] = ${(0,n.literal)(e.ordinal_position)}
    ORDER BY oid asc
    LIMIT 1;

  IF v_conname IS NOT NULL THEN
    EXECUTE format('ALTER TABLE ${(0,n.ident)(e.schema)}.${(0,n.ident)(e.table)} DROP CONSTRAINT %I', v_conname);
  END IF;

  ${null!==p?`
  ALTER TABLE ${(0,n.ident)(e.schema)}.${(0,n.ident)(e.table)} ADD CONSTRAINT ${(0,n.ident)(`${e.table}_${e.name}_check`)} CHECK (${p});

  SELECT conkey into v_conkey FROM pg_constraint WHERE conname = ${(0,n.literal)(`${e.table}_${e.name}_check`)};

  ASSERT v_conkey IS NOT NULL, 'error creating column constraint: check condition must refer to this column';
  ASSERT cardinality(v_conkey) = 1, 'error creating column constraint: check condition cannot refer to multiple columns';
  ASSERT v_conkey[1] = ${(0,n.literal)(e.ordinal_position)}, 'error creating column constraint: check condition cannot refer to other columns';
`:""}
END
$$;
`;return{sql:`
BEGIN;
  ${u}
  ${g}
  ${m}
  ${S}
  ${N}
  ${b}
  ${T}
  ${f}
COMMIT;`}},remove:function(e,{cascade:t=!1}={}){return{sql:n.safeSql`ALTER TABLE ${(0,n.ident)(e.schema)}.${(0,n.ident)(e.table)} DROP COLUMN ${(0,n.ident)(e.name)} ${t?n.safeSql`CASCADE`:n.safeSql`RESTRICT`};`}},zod:_},"pgColumnArrayZod",0,p],761087);let u=n.safeSql`
SELECT
  name,
  setting,
  category,
  TRIM(split_part(category, '/', 1)) AS group,
  TRIM(split_part(category, '/', 2)) AS subgroup,
  unit,
  short_desc,
  extra_desc,
  context,
  vartype,
  source,
  min_val,
  max_val,
  enumvals,
  boot_val,
  reset_val,
  sourcefile,
  sourceline,
  pending_restart
FROM
  pg_settings
ORDER BY
  category,
  name
`,f=t.z.object({name:t.z.string(),setting:t.z.string(),category:t.z.string(),group:t.z.string(),subgroup:t.z.string(),unit:t.z.string().nullable(),short_desc:t.z.string(),extra_desc:t.z.string().nullable(),context:t.z.string(),vartype:t.z.string(),source:t.z.string(),min_val:t.z.string().nullable(),max_val:t.z.string().nullable(),enumvals:t.z.array(t.z.string()).nullable(),boot_val:t.z.string().nullable(),reset_val:t.z.string().nullable(),sourcefile:t.z.string().nullable(),sourceline:t.z.number().nullable(),pending_restart:t.z.boolean()}),g=t.z.array(f);e.s(["default",0,{list:function({limit:e,offset:t}={}){let a=u;return e&&(a=n.safeSql`${a} LIMIT ${(0,n.literal)(e)}`),t&&(a=n.safeSql`${a} OFFSET ${(0,n.literal)(t)}`),{sql:a,zod:g}},zod:f}],486603);let S=n.safeSql`
SELECT
  e.name,
  n.nspname AS schema,
  e.default_version,
  x.extversion AS installed_version,
  e.comment
FROM
  pg_available_extensions() e(name, default_version, comment)
  LEFT JOIN pg_extension x ON e.name = x.extname
  LEFT JOIN pg_namespace n ON x.extnamespace = n.oid
`,N=t.z.object({name:t.z.string(),schema:t.z.string().nullable(),default_version:t.z.string(),installed_version:t.z.string().nullable(),comment:t.z.string()}),b=t.z.array(N),T=t.z.optional(N);e.s(["default",0,{list:function({limit:e,offset:t}={}){let a=S;return e&&(a=n.safeSql`${a} LIMIT ${(0,n.literal)(e)}`),t&&(a=n.safeSql`${a} OFFSET ${(0,n.literal)(t)}`),{sql:a,zod:b}},retrieve:function({name:e}){return{sql:n.safeSql`${S} WHERE name = ${(0,n.literal)(e)};`,zod:T}},create:function({name:e,schema:t,version:a,cascade:i=!1}){return{sql:n.safeSql`
CREATE EXTENSION ${(0,n.ident)(e)}
  ${void 0===t?n.safeSql``:n.safeSql`SCHEMA ${(0,n.ident)(t)}`}
  ${void 0===a?n.safeSql``:n.safeSql`VERSION ${(0,n.literal)(a)}`}
  ${i?n.safeSql`CASCADE`:n.safeSql``};`}},update:function(e,{update:t=!1,version:a,schema:i}){let r=n.safeSql``;t&&(r=n.safeSql`ALTER EXTENSION ${(0,n.ident)(e)} UPDATE ${void 0===a?n.safeSql``:n.safeSql`TO ${(0,n.literal)(a)}`};`);let l=void 0===i?n.safeSql``:n.safeSql`ALTER EXTENSION ${(0,n.ident)(e)} SET SCHEMA ${(0,n.ident)(i)};`;return{sql:n.safeSql`BEGIN; ${r} ${l} COMMIT;`}},remove:function(e,{cascade:t=!1}={}){return{sql:n.safeSql`DROP EXTENSION ${(0,n.ident)(e)} ${t?n.safeSql`CASCADE`:n.safeSql`RESTRICT`};`}},zod:N}],981263);let h=n.safeSql`
select
  c.oid::int8 as id,
  n.nspname as schema,
  c.relname as name,
  obj_description(c.oid) as comment,
  fs.srvname as foreign_server_name,
  fdw.fdwname as foreign_data_wrapper_name,
  handler.proname as foreign_data_wrapper_handler
from
  pg_class c
  join pg_namespace n on n.oid = c.relnamespace
  inner join pg_foreign_table ft on ft.ftrelid = c.oid
  inner join pg_foreign_server fs on fs.oid = ft.ftserver
  inner join pg_foreign_data_wrapper fdw on fdw.oid = fs.srvfdw
  inner join pg_proc handler on handler.oid = fdw.fdwhandler
where
  c.relkind = 'f'
`,v=t.z.object({id:t.z.number(),schema:t.z.string(),name:t.z.string(),comment:t.z.string().nullable(),foreign_server_name:t.z.string(),foreign_data_wrapper_name:t.z.string(),foreign_data_wrapper_handler:t.z.string(),columns:p.optional()}),A=t.z.array(v),I=t.z.optional(v),$=({includeColumns:e})=>n.safeSql`
with foreign_tables as (${h})
  ${e?n.safeSql`, columns as (${d})`:n.safeSql``}
select
  *
  ${e?n.safeSql`, ${i("columns",n.safeSql`columns.table_id = foreign_tables.id`)}`:n.safeSql``}
from foreign_tables`;e.s(["default",0,{list:function({includeSystemSchemas:e=!1,includedSchemas:t,excludedSchemas:i,limit:l,offset:s,includeColumns:o=!0}={}){let c=$({includeColumns:o}),d=r(t,i,e?void 0:a.DEFAULT_SYSTEM_SCHEMAS);return d&&(c=n.safeSql`${c} where schema ${d}`),l&&(c=n.safeSql`${c} limit ${(0,n.literal)(l)}`),s&&(c=n.safeSql`${c} offset ${(0,n.literal)(s)}`),{sql:c,zod:A}},retrieve:function(e){return{sql:n.safeSql`${$({includeColumns:!0})} where ${function(e){if("id"in e&&e.id)return n.safeSql`${(0,n.ident)("id")} = ${(0,n.literal)(e.id)}`;if("name"in e&&e.name&&e.schema)return n.safeSql`${(0,n.ident)("name")} = ${(0,n.literal)(e.name)} and ${(0,n.ident)("schema")} = ${(0,n.literal)(e.schema)}`;throw Error("Must provide either id or name and schema")}(e)};`,zod:I}},zod:v}],254873);let R=n.safeSql`
-- CTE with sane arg_modes, arg_names, and arg_types.
-- All three are always of the same length.
-- All three include all args, including OUT and TABLE args.
with functions as (
  select
    *,
    -- proargmodes is null when all arg modes are IN
    coalesce(
      p.proargmodes,
      array_fill('i'::text, array[cardinality(coalesce(p.proallargtypes, p.proargtypes))])
    ) as arg_modes,
    -- proargnames is null when all args are unnamed
    coalesce(
      p.proargnames,
      array_fill(''::text, array[cardinality(coalesce(p.proallargtypes, p.proargtypes))])
    ) as arg_names,
    -- proallargtypes is null when all arg modes are IN
    coalesce(p.proallargtypes, p.proargtypes) as arg_types,
    array_cat(
      array_fill(false, array[pronargs - pronargdefaults]),
      array_fill(true, array[pronargdefaults])) as arg_has_defaults
  from
    pg_proc as p
  where
    p.prokind = 'f'
)
select
  f.oid as id,
  n.nspname as schema,
  f.proname as name,
  l.lanname as language,
  case
    when l.lanname = 'internal' then ''
    else f.prosrc
  end as definition,
  case
    when l.lanname = 'internal' then f.prosrc
    else pg_get_functiondef(f.oid)
  end as complete_statement,
  coalesce(f_args.args, '[]') as args,
  pg_get_function_arguments(f.oid) as argument_types,
  pg_get_function_identity_arguments(f.oid) as identity_argument_types,
  f.prorettype as return_type_id,
  pg_get_function_result(f.oid) as return_type,
  nullif(rt.typrelid, 0) as return_type_relation_id,
  f.proretset as is_set_returning_function,
  case
    when f.provolatile = 'i' then 'IMMUTABLE'
    when f.provolatile = 's' then 'STABLE'
    when f.provolatile = 'v' then 'VOLATILE'
  end as behavior,
  f.prosecdef as security_definer,
  f_config.config_params as config_params
from
  functions f
  left join pg_namespace n on f.pronamespace = n.oid
  left join pg_language l on f.prolang = l.oid
  left join pg_type rt on rt.oid = f.prorettype
  left join (
    select
      oid,
      jsonb_object_agg(param, value) filter (where param is not null) as config_params
    from
      (
        select
          oid,
          (string_to_array(unnest(proconfig), '='))[1] as param,
          (string_to_array(unnest(proconfig), '='))[2] as value
        from
          functions
      ) as t
    group by
      oid
  ) f_config on f_config.oid = f.oid
  left join (
    select
      oid,
      jsonb_agg(jsonb_build_object(
        'mode', t2.mode,
        'name', name,
        'type_id', type_id,
        -- Cast null into false boolean
        'has_default', COALESCE(has_default, false)
      )) as args
    from
      (
        select
          oid,
          unnest(arg_modes) as mode,
          unnest(arg_names) as name,
          -- Coming from: coalesce(p.proallargtypes, p.proargtypes) postgres won't automatically assume
          -- integer, we need to cast it to be properly parsed
          unnest(arg_types)::int8 as type_id,
          unnest(arg_has_defaults) as has_default
        from
          functions
      ) as t1,
      lateral (
        select
          case
            when t1.mode = 'i' then 'in'
            when t1.mode = 'o' then 'out'
            when t1.mode = 'b' then 'inout'
            when t1.mode = 'v' then 'variadic'
            else 'table'
          end as mode
      ) as t2
    group by
      t1.oid
  ) f_args on f_args.oid = f.oid
`,L=t.z.object({id:t.z.number(),schema:t.z.string(),name:t.z.string(),language:t.z.string(),definition:t.z.string(),complete_statement:t.z.string(),args:t.z.array(t.z.object({mode:t.z.union([t.z.literal("in"),t.z.literal("out"),t.z.literal("inout"),t.z.literal("variadic"),t.z.literal("table")]),name:t.z.string(),type_id:t.z.number(),has_default:t.z.boolean()})),argument_types:t.z.string(),identity_argument_types:t.z.string(),return_type_id:t.z.number(),return_type:t.z.string(),return_type_relation_id:t.z.union([t.z.number(),t.z.null()]),is_set_returning_function:t.z.boolean(),behavior:t.z.union([t.z.literal("IMMUTABLE"),t.z.literal("STABLE"),t.z.literal("VOLATILE")]),security_definer:t.z.boolean(),config_params:t.z.union([t.z.record(t.z.string(),t.z.string()),t.z.null()])}),O=t.z.array(L),y=t.z.optional(L),q=t.z.object({name:t.z.string(),definition:t.z.string(),args:t.z.array(t.z.string()).optional(),behavior:t.z.enum(["IMMUTABLE","STABLE","VOLATILE"]).optional(),config_params:t.z.record(t.z.string(),t.z.string()).optional(),schema:t.z.string().optional(),language:t.z.string().optional(),return_type:t.z.string().optional(),security_definer:t.z.boolean().optional()});function C({name:e,schema:t,args:a,definition:i,return_type:r,language:l,behavior:s,security_definer:o,config_params:c},{replace:d=!1}={}){return`
    CREATE ${d?"OR REPLACE":""} FUNCTION ${(0,n.ident)(t)}.${(0,n.ident)(e)}(${a?.join(", ")||""})
    RETURNS ${r}
    AS ${(0,n.literal)(i)}
    LANGUAGE ${l}
    ${s}
    CALLED ON NULL INPUT
    ${o?"SECURITY DEFINER":"SECURITY INVOKER"}
    ${c?Object.entries(c).map(([e,t])=>`SET ${e} ${"FROM CURRENT"===t?"FROM CURRENT":"TO "+('""'===t?"''":t)}`).join("\n"):""};
  `}let z=t.z.object({name:t.z.string().optional(),schema:t.z.string().optional(),definition:t.z.string().optional()}),D=t.z.object({cascade:t.z.boolean().default(!1).optional()});e.s(["create",0,function({name:e,schema:a="public",args:n=[],definition:i,return_type:r="void",language:l="sql",behavior:s="VOLATILE",security_definer:o=!1,config_params:c={}}){return{sql:C({name:e,schema:a,args:n,definition:i,return_type:r,language:l,behavior:s,security_definer:o,config_params:c}),zod:t.z.void()}},"list",0,function({includeSystemSchemas:e=!1,includedSchemas:t,excludedSchemas:i,limit:l,offset:s}={}){let o=n.safeSql`
    with f as (
      ${R}
    )
    select
      f.*
    from f
  `,c=r(t,i,e?void 0:a.DEFAULT_SYSTEM_SCHEMAS);return c&&(o=n.safeSql`${o} where schema ${c}`),l&&(o=n.safeSql`${o} limit ${(0,n.literal)(l)}`),s&&(o=n.safeSql`${o} offset ${(0,n.literal)(s)}`),{sql:o,zod:O}},"pgFunctionArrayZod",0,O,"pgFunctionCreateZod",0,q,"pgFunctionDeleteZod",0,D,"pgFunctionOptionalZod",0,y,"pgFunctionUpdateZod",0,z,"pgFunctionZod",0,L,"remove",0,function(e,{cascade:a=!1}={}){return{sql:`DROP FUNCTION ${(0,n.ident)(e.schema)}.${(0,n.ident)(e.name)}
  (${e.identity_argument_types})
  ${a?"CASCADE":"RESTRICT"};`,zod:t.z.void()}},"retrieve",0,function({id:e,name:t,schema:a="public",args:i=[]}){if(e)return{sql:n.safeSql`
      with f as (
        ${R}
      )
      select
        f.*
      from f where id = ${(0,n.literal)(e)};`,zod:y};if(t&&a&&i){let e=i.length?n.safeSql`(
          select string_agg(type_oid::text, ' ') from (
            select (
              split_args.arr[
                array_length(
                  split_args.arr,
                  1
                )
              ]::regtype::oid
            ) as type_oid from (
              select string_to_array(
                unnest(
                  array[${(0,n.joinSqlFragments)(i.map(n.literal),",")}]
                ),
                ' '
              ) as arr
            ) as split_args
          ) args
        )`:(0,n.literal)("");return{sql:n.safeSql`with f as (
      ${R}
    )
    select
      f.*
    from f join pg_proc as p on id = p.oid where schema = ${(0,n.literal)(a)} and name = ${(0,n.literal)(t)} and p.proargtypes::text = ${e}`,zod:y}}throw Error("Must provide either id or name and schema")},"update",0,function(e,{name:a,schema:i,definition:r}){let l=e.argument_types.split(", "),s=e.identity_argument_types,o="string"==typeof r?C({...e,definition:r,args:l,config_params:e.config_params??{}},{replace:!0}):"",c=a&&a!==e.name?`ALTER FUNCTION ${(0,n.ident)(e.schema)}.${(0,n.ident)(e.name)}(${s}) RENAME TO ${(0,n.ident)(a)};`:"",d=i&&i!==e.schema?`ALTER FUNCTION ${(0,n.ident)(e.schema)}.${(0,n.ident)(a||e.name)}(${s})  SET SCHEMA ${(0,n.ident)(i)};`:"";return{sql:`
    DO LANGUAGE plpgsql $$
    BEGIN
      IF ${"string"==typeof r?"TRUE":"FALSE"} THEN
        ${o}

        IF (
          SELECT id
          FROM (${R}) AS f
          WHERE f.schema = ${(0,n.literal)(e.schema)}
          AND f.name = ${(0,n.literal)(e.name)}
          AND f.identity_argument_types = ${(0,n.literal)(s)}
        ) != ${e.id} THEN
          RAISE EXCEPTION 'Cannot find function "${e.schema}"."${e.name}"(${s})';
        END IF;
      END IF;

      ${c}

      ${d}
    END;
    $$;
  `,zod:t.z.void()}}],198687);let F=n.safeSql`
  SELECT
    idx.indexrelid::int8 AS id,
    idx.indrelid::int8 AS table_id,
    n.nspname AS schema,
    idx.indnatts AS number_of_attributes,
    idx.indnkeyatts AS number_of_key_attributes,
    idx.indisunique AS is_unique,
    idx.indisprimary AS is_primary,
    idx.indisexclusion AS is_exclusion,
    idx.indimmediate AS is_immediate,
    idx.indisclustered AS is_clustered,
    idx.indisvalid AS is_valid,
    idx.indcheckxmin AS check_xmin,
    idx.indisready AS is_ready,
    idx.indislive AS is_live,
    idx.indisreplident AS is_replica_identity,
    idx.indkey::smallint[] AS key_attributes,
    idx.indcollation::integer[] AS collation,
    idx.indclass::integer[] AS class,
    idx.indoption::smallint[] AS options,
    idx.indpred AS index_predicate,
    obj_description(idx.indexrelid, 'pg_class') AS comment,
    ix.indexdef as index_definition,
    am.amname AS access_method,
    jsonb_agg(
      jsonb_build_object(
        'attribute_number', a.attnum,
        'attribute_name', a.attname,
        'data_type', format_type(a.atttypid, a.atttypmod)
      )
      ORDER BY a.attnum
    ) AS index_attributes
  FROM
    pg_index idx
    JOIN pg_class c ON c.oid = idx.indexrelid
    JOIN pg_namespace n ON c.relnamespace = n.oid
    JOIN pg_am am ON c.relam = am.oid
    JOIN pg_attribute a ON a.attrelid = c.oid AND a.attnum = ANY(idx.indkey)
    JOIN pg_indexes ix ON c.relname = ix.indexname
  GROUP BY
    idx.indexrelid, idx.indrelid, n.nspname, idx.indnatts, idx.indnkeyatts, idx.indisunique, 
    idx.indisprimary, idx.indisexclusion, idx.indimmediate, idx.indisclustered, idx.indisvalid, 
    idx.indcheckxmin, idx.indisready, idx.indislive, idx.indisreplident, idx.indkey, 
    idx.indcollation, idx.indclass, idx.indoption, idx.indexprs, idx.indpred, ix.indexdef, am.amname
`,w=t.z.object({id:t.z.number(),table_id:t.z.number(),schema:t.z.string(),number_of_attributes:t.z.number(),number_of_key_attributes:t.z.number(),is_unique:t.z.boolean(),is_primary:t.z.boolean(),is_exclusion:t.z.boolean(),is_immediate:t.z.boolean(),is_clustered:t.z.boolean(),is_valid:t.z.boolean(),check_xmin:t.z.boolean(),is_ready:t.z.boolean(),is_live:t.z.boolean(),is_replica_identity:t.z.boolean(),key_attributes:t.z.array(t.z.number()),collation:t.z.array(t.z.number()),class:t.z.array(t.z.number()),options:t.z.array(t.z.number()),index_predicate:t.z.string().nullable(),comment:t.z.string().nullable(),index_definition:t.z.string(),access_method:t.z.string(),index_attributes:t.z.array(t.z.object({attribute_number:t.z.number(),attribute_name:t.z.string(),data_type:t.z.string()}))}),x=t.z.array(w),H=t.z.optional(w);e.s(["default",0,{list:function({includeSystemSchemas:e=!1,includedSchemas:t,excludedSchemas:i,limit:l,offset:s}={}){let o=n.safeSql`
    with indexes as (${F})
    select *
    from indexes
  `,c=r(t,i,e?void 0:a.DEFAULT_SYSTEM_SCHEMAS);return c&&(o=n.safeSql`${o} where schema ${c}`),l&&(o=n.safeSql`${o} limit ${(0,n.literal)(l)}`),s&&(o=n.safeSql`${o} offset ${(0,n.literal)(s)}`),{sql:o,zod:x}},retrieve:function({id:e}){return{sql:n.safeSql`
    with indexes as (${F})
    select *
    from indexes
    where id = ${(0,n.literal)(e)};
  `,zod:H}},zod:w}],673351);let U=n.safeSql`
select
  c.oid::int8 as id,
  n.nspname as schema,
  c.relname as name,
  c.relispopulated as is_populated,
  obj_description(c.oid) as comment
from
  pg_class c
  join pg_namespace n on n.oid = c.relnamespace
where
  c.relkind = 'm'
`,M=t.z.object({id:t.z.number(),schema:t.z.string(),name:t.z.string(),is_populated:t.z.boolean(),comment:t.z.string().nullable(),columns:p.optional()}),k=t.z.array(M),j=t.z.optional(M),P=({includeColumns:e})=>n.safeSql`
with materialized_views as (${U})
  ${e?n.safeSql`, columns as (${d})`:n.safeSql``}
select
  *
  ${e?n.safeSql`, ${i("columns",n.safeSql`columns.table_id = materialized_views.id`)}`:n.safeSql``}
from materialized_views`;e.s(["default",0,{list:function({includeSystemSchemas:e=!1,includedSchemas:t,excludedSchemas:i,limit:l,offset:s,includeColumns:o=!0}={}){let c=P({includeColumns:o}),d=r(t,i,e?void 0:a.DEFAULT_SYSTEM_SCHEMAS);return d&&(c=n.safeSql`${c} where schema ${d}`),l&&(c=n.safeSql`${c} limit ${(0,n.literal)(l)}`),s&&(c=n.safeSql`${c} offset ${(0,n.literal)(s)}`),{sql:c,zod:k}},retrieve:function(e){let t=function(e){if("id"in e&&e.id)return n.safeSql`${(0,n.ident)("id")} = ${(0,n.literal)(e.id)}`;if("name"in e&&e.name&&e.schema)return n.safeSql`${(0,n.ident)("name")} = ${(0,n.literal)(e.name)} and ${(0,n.ident)("schema")} = ${(0,n.literal)(e.schema)}`;throw Error("Must provide either id or name and schema")}(e);return{sql:n.safeSql`${P({includeColumns:!0})} where ${t};`,zod:j}},zod:M}],784883);let W=n.safeSql`
select
  pol.oid :: int8 as id,
  n.nspname as schema,
  c.relname as table,
  c.oid :: int8 as table_id,
  pol.polname as name,
  case
    when pol.polpermissive then 'PERMISSIVE'::text
    else 'RESTRICTIVE'::text
  end as action,
  case
    when pol.polroles = '{0}'::oid[] then array_to_json(string_to_array('public'::text, ''::text)::name[])
    else array_to_json(array(
      select pg_roles.rolname
      from pg_roles
      where pg_roles.oid = any(pol.polroles)
      order by pg_roles.rolname
    ))
  end as roles,
  case pol.polcmd
    when 'r'::"char" then 'SELECT'::text
    when 'a'::"char" then 'INSERT'::text
    when 'w'::"char" then 'UPDATE'::text
    when 'd'::"char" then 'DELETE'::text
    when '*'::"char" then 'ALL'::text
    else null::text
  end as command,
  pg_get_expr(pol.polqual, pol.polrelid) as definition,
  pg_get_expr(pol.polwithcheck, pol.polrelid) as check
from
  pg_policy pol
  join pg_class c on c.oid = pol.polrelid
  left join pg_namespace n on n.oid = c.relnamespace
`,Y=t.z.object({id:t.z.number(),schema:t.z.string(),table:t.z.string(),table_id:t.z.number(),name:t.z.string(),action:t.z.union([t.z.literal("PERMISSIVE"),t.z.literal("RESTRICTIVE")]),roles:t.z.array(t.z.string()),command:t.z.union([t.z.literal("SELECT"),t.z.literal("INSERT"),t.z.literal("UPDATE"),t.z.literal("DELETE"),t.z.literal("ALL")]),definition:t.z.union([t.z.string(),t.z.null()]),check:t.z.union([t.z.string(),t.z.null()])}),B=t.z.array(Y),G=t.z.optional(Y);e.s(["default",0,{list:function({includeSystemSchemas:e=!1,includedSchemas:t,excludedSchemas:i,limit:l,offset:s}={}){let o=n.safeSql`
    with policies as (${W})
    select *
    from policies
    `,c=r(t,i,e?void 0:a.DEFAULT_SYSTEM_SCHEMAS);return c&&(o=n.safeSql`${o}where schema ${c}`),l&&(o=n.safeSql`${o} limit ${(0,n.literal)(l)}`),s&&(o=n.safeSql`${o} offset ${(0,n.literal)(s)}`),{sql:o,zod:B}},retrieve:function(e){return{sql:n.safeSql`with policies as (${W}) select * from policies where ${function(e){if("id"in e&&e.id)return n.safeSql`id = ${(0,n.literal)(e.id)}`;if("name"in e&&e.name&&e.schema&&e.table)return n.safeSql`name = ${(0,n.literal)(e.name)} AND schema = ${(0,n.literal)(e.schema)} AND table = ${(0,n.literal)(e.table)}`;throw Error("Must provide either id or name, schema and table")}(e)};`,zod:G}},create:function({name:e,schema:t="public",table:a,definition:i,check:r,action:l="PERMISSIVE",command:s="ALL",roles:o=["public"]}){return{sql:`
create policy ${(0,n.ident)(e)} on ${(0,n.ident)(t)}.${(0,n.ident)(a)}
  as ${l}
  for ${s}
  to ${o.map(n.ident).join(",")}
  ${i?`using (${i})`:""}
  ${r?`with check (${r})`:""};`}},update:function(e,t){let{name:a,definition:i,check:r,roles:l}=t,s=`ALTER POLICY ${(0,n.ident)(e.name)} ON ${(0,n.ident)(e.schema)}.${(0,n.ident)(e.table)}`,o=void 0===a?"":`${s} RENAME TO ${(0,n.ident)(a)};`,c=void 0===i?"":`${s} USING (${i});`,d=void 0===r?"":`${s} WITH CHECK (${r});`,_=void 0===l?"":`${s} TO ${l.map(n.ident).join(",")};`;return{sql:`BEGIN; ${c} ${d} ${_} ${o} COMMIT;`}},remove:function(e){return{sql:n.safeSql`DROP POLICY ${(0,n.ident)(e.name)} ON ${(0,n.ident)(e.schema)}.${(0,n.ident)(e.table)};`}},zod:Y}],201049);let X=n.safeSql`
SELECT
  p.oid :: int8 AS id,
  p.pubname AS name,
  p.pubowner::regrole::text AS owner,
  p.pubinsert AS publish_insert,
  p.pubupdate AS publish_update,
  p.pubdelete AS publish_delete,
  p.pubtruncate AS publish_truncate,
  CASE
    WHEN p.puballtables THEN NULL
    ELSE pr.tables
  END AS tables
FROM
  pg_catalog.pg_publication AS p
  LEFT JOIN LATERAL (
    SELECT
      COALESCE(
        array_agg(
          json_build_object(
            'id',
            c.oid :: int8,
            'name',
            c.relname,
            'schema',
            nc.nspname
          )
        ),
        '{}'
      ) AS tables
    FROM
      pg_catalog.pg_publication_rel AS pr
      JOIN pg_class AS c ON pr.prrelid = c.oid
      join pg_namespace as nc on c.relnamespace = nc.oid
    WHERE
      pr.prpubid = p.oid
  ) AS pr ON 1 = 1
`,J=t.z.object({id:t.z.number().optional(),name:t.z.string(),schema:t.z.string()}),Q=t.z.object({id:t.z.number(),name:t.z.string(),owner:t.z.string(),publish_insert:t.z.boolean(),publish_update:t.z.boolean(),publish_delete:t.z.boolean(),publish_truncate:t.z.boolean(),tables:t.z.array(J).nullable()}),V=t.z.array(Q),K=t.z.optional(Q);e.s(["default",0,{list:function({limit:e,offset:t}={}){let a=n.safeSql`with publications as (${X}) select * from publications`;return e&&(a=n.safeSql`${a} limit ${(0,n.literal)(e)}`),t&&(a=n.safeSql`${a} offset ${(0,n.literal)(t)}`),{sql:a,zod:V}},retrieve:function(e){return{sql:n.safeSql`with publications as (${X}) select * from publications where ${function(e){if("id"in e&&e.id)return n.safeSql`${(0,n.ident)("id")} = ${(0,n.literal)(e.id)}`;if("name"in e&&e.name)return n.safeSql`${(0,n.ident)("name")} = ${(0,n.literal)(e.name)}`;throw Error("Must provide either id or name")}(e)};`,zod:K}},create:function({name:e,publish_insert:t=!1,publish_update:a=!1,publish_delete:i=!1,publish_truncate:r=!1,tables:l=null}){let s;s=null==l?n.safeSql`FOR ALL TABLES`:0===l.length?n.safeSql``:n.safeSql`FOR TABLE ${(0,n.joinSqlFragments)(l.map(e=>{if(!e.includes("."))return(0,n.ident)(e);let[t,...a]=e.split("."),i=a.join(".");return n.safeSql`${(0,n.ident)(t)}.${(0,n.ident)(i)}`}),",")}`;let o=[];return t&&o.push("insert"),a&&o.push("update"),i&&o.push("delete"),r&&o.push("truncate"),{sql:n.safeSql`
CREATE PUBLICATION ${(0,n.ident)(e)} ${s}
  WITH (publish = ${(0,n.literal)(o.join(","))});`}},update:function(e,{name:t,owner:a,publish_insert:i,publish_update:r,publish_delete:l,publish_truncate:s,tables:o}){return{sql:n.safeSql`
do $$
declare
  id oid := ${(0,n.literal)(e)};
  old record;
  new_name text := ${void 0===t?(0,n.literal)(null):(0,n.literal)(t)};
  new_owner text := ${void 0===a?(0,n.literal)(null):(0,n.literal)(a)};
  new_publish_insert bool := ${(0,n.literal)(i??null)};
  new_publish_update bool := ${(0,n.literal)(r??null)};
  new_publish_delete bool := ${(0,n.literal)(l??null)};
  new_publish_truncate bool := ${(0,n.literal)(s??null)};
  new_tables text := ${void 0===o?(0,n.literal)(null):(0,n.literal)(null===o?"all tables":o.map(e=>{if(!e.includes("."))return(0,n.ident)(e);let[t,...a]=e.split("."),i=a.join(".");return n.safeSql`${(0,n.ident)(t)}.${(0,n.ident)(i)}`}).join(","))};
begin
  select * into old from pg_publication where oid = id;
  if old is null then
    raise exception 'Cannot find publication with id %', id;
  end if;

  if new_tables is null then
    null;
  elsif new_tables = 'all tables' then
    if old.puballtables then
      null;
    else
      -- Need to recreate because going from list of tables <-> all tables with alter is not possible.
      execute(format('drop publication %1$I; create publication %1$I for all tables;', old.pubname));
    end if;
  else
    if old.puballtables then
      -- Need to recreate because going from list of tables <-> all tables with alter is not possible.
      execute(format('drop publication %1$I; create publication %1$I;', old.pubname));
    elsif exists(select from pg_publication_rel where prpubid = id) then
      execute(
        format(
          'alter publication %I drop table %s',
          old.pubname,
          (select string_agg(prrelid::regclass::text, ', ') from pg_publication_rel where prpubid = id)
        )
      );
    end if;

    -- At this point the publication must have no tables.

    if new_tables != '' then
      execute(format('alter publication %I add table %s', old.pubname, new_tables));
    end if;
  end if;

  execute(
    format(
      'alter publication %I set (publish = %L);',
      old.pubname,
      concat_ws(
        ', ',
        case when coalesce(new_publish_insert, old.pubinsert) then 'insert' end,
        case when coalesce(new_publish_update, old.pubupdate) then 'update' end,
        case when coalesce(new_publish_delete, old.pubdelete) then 'delete' end,
        case when coalesce(new_publish_truncate, old.pubtruncate) then 'truncate' end
      )
    )
  );

  execute(format('alter publication %I owner to %I;', old.pubname, coalesce(new_owner, old.pubowner::regrole::name)));

  -- Using the same name in the rename clause gives an error, so only do it if the new name is different.
  if new_name is not null and new_name != old.pubname then
    execute(format('alter publication %I rename to %I;', old.pubname, coalesce(new_name, old.pubname)));
  end if;

  -- We need to retrieve the publication later, so we need a way to uniquely identify which publication this is.
  -- We can't rely on id because it gets changed if it got recreated.
  -- We use a temp table to store the unique name - DO blocks can't return a value.
  create temp table pg_meta_publication_tmp (name) on commit drop as values (coalesce(new_name, old.pubname));
end $$;
`}},remove:function(e){return{sql:n.safeSql`DROP PUBLICATION IF EXISTS ${(0,n.ident)(e.name)};`}},zod:Q}],557928);let Z=n.safeSql`
-- Can't use pg_authid here since some managed Postgres providers don't expose it
-- https://github.com/supabase/postgres-meta/issues/212

select
  r.oid as id,
  rolname as name,
  rolsuper as "isSuperuser",
  rolcreatedb as "canCreateDb",
  rolcreaterole as "canCreateRole",
  rolinherit as "inheritRole",
  rolcanlogin as "canLogin",
  rolreplication as "isReplicationRole",
  rolbypassrls as "canBypassRls",
  (
    select
      count(*)
    from
      pg_stat_activity
    where
      r.rolname = pg_stat_activity.usename
  ) as "activeConnections",
  case when rolconnlimit = -1 then current_setting('max_connections') :: int8
       else rolconnlimit
  end as "connectionLimit",
  rolvaliduntil as "validUntil",
  coalesce(r_config.role_configs, '{}') as config
from
  pg_roles r
  left join (
    select
      oid,
      jsonb_object_agg(param, value) filter (where param is not null) as role_configs
    from
      (
        select
          oid,
          (string_to_array(unnest(rolconfig), '='))[1] as param,
          (string_to_array(unnest(rolconfig), '='))[2] as value
        from
          pg_roles
      ) as _
    group by
      oid
  ) r_config on r_config.oid = r.oid
`,ee=t.z.object({id:t.z.number(),name:t.z.string(),isSuperuser:t.z.boolean(),canCreateDb:t.z.boolean(),canCreateRole:t.z.boolean(),inheritRole:t.z.boolean(),canLogin:t.z.boolean(),isReplicationRole:t.z.boolean(),canBypassRls:t.z.boolean(),activeConnections:t.z.number(),connectionLimit:t.z.number(),validUntil:t.z.union([t.z.string(),t.z.null()]),config:t.z.record(t.z.string(),t.z.string())}),et=t.z.array(ee),ea=t.z.optional(ee);function en(e){if("id"in e&&e.id)return n.safeSql`${(0,n.ident)("id")} = ${(0,n.literal)(e.id)}`;if("name"in e&&e.name)return n.safeSql`${(0,n.ident)("name")} = ${(0,n.literal)(e.name)}`;throw Error("Must provide either id or name")}e.s(["default",0,{list:function({includeDefaultRoles:e=!1,limit:t,offset:a}={}){let i=n.safeSql`
with
  roles as (${Z})
select
  *
from
  roles
where
  true
`;return e||(i=n.safeSql`${i} and not pg_catalog.starts_with(name, 'pg_')`),t&&(i=n.safeSql`${i} limit ${(0,n.literal)(t)}`),a&&(i=n.safeSql`${i} offset ${(0,n.literal)(a)}`),{sql:i,zod:et}},retrieve:function(e){return{sql:n.safeSql`with roles as (${Z}) select * from roles where ${en(e)};`,zod:ea}},create:function({name:e,isSuperuser:t=!1,canCreateDb:a=!1,canCreateRole:i=!1,inheritRole:r=!0,canLogin:l=!1,isReplicationRole:s=!1,canBypassRls:o=!1,connectionLimit:c=-1,password:d,validUntil:_,memberOf:p=[],members:m=[],admins:E=[],config:u={}}){return{sql:n.safeSql`
create role ${(0,n.ident)(e)}
  ${t?n.safeSql`superuser`:n.safeSql``}
  ${a?n.safeSql`createdb`:n.safeSql``}
  ${i?n.safeSql`createrole`:n.safeSql``}
  ${r?n.safeSql``:n.safeSql`noinherit`}
  ${l?n.safeSql`login`:n.safeSql``}
  ${s?n.safeSql`replication`:n.safeSql``}
  ${o?n.safeSql`bypassrls`:n.safeSql``}
  connection limit ${(0,n.literal)(c)}
  ${void 0===d?n.safeSql``:n.safeSql`password ${(0,n.literal)(d)}`}
  ${void 0===_?n.safeSql``:n.safeSql`valid until ${(0,n.literal)(_)}`}
  ${0===p.length?n.safeSql``:n.safeSql`in role ${(0,n.joinSqlFragments)(p.map(n.ident),",")}`}
  ${0===m.length?n.safeSql``:n.safeSql`role ${(0,n.joinSqlFragments)(m.map(n.ident),",")}`}
  ${0===E.length?n.safeSql``:n.safeSql`admin ${(0,n.joinSqlFragments)(E.map(n.ident),",")}`}
  ;
${(0,n.joinSqlFragments)(Object.entries(u).map(([t,a])=>n.safeSql`alter role ${(0,n.ident)(e)} set ${(0,n.ident)(t)} = ${(0,n.literal)(a)};`),"\n")}
`}},update:function(e,t){let{name:a,isSuperuser:i,canCreateDb:r,canCreateRole:l,inheritRole:s,canLogin:o,isReplicationRole:c,canBypassRls:d,connectionLimit:_,password:p,validUntil:m}=t;return{sql:n.safeSql`
do $$
declare
  old record;
begin
  with roles as (${Z})
  select * into old from roles where ${en(e)};
  if old is null then
    raise exception 'Cannot find role with id %', id;
  end if;

  execute(format('alter role %I
    ${void 0===i?n.safeSql``:i?n.safeSql`superuser`:n.safeSql`nosuperuser`}
    ${void 0===r?n.safeSql``:r?n.safeSql`createdb`:n.safeSql`nocreatedb`}
    ${void 0===l?n.safeSql``:l?n.safeSql`createrole`:n.safeSql`nocreaterole`}
    ${void 0===s?n.safeSql``:s?n.safeSql`inherit`:n.safeSql`noinherit`}
    ${void 0===o?n.safeSql``:o?n.safeSql`login`:n.safeSql`nologin`}
    ${void 0===c?n.safeSql``:c?n.safeSql`replication`:n.safeSql`noreplication`}
    ${void 0===d?n.safeSql``:d?n.safeSql`bypassrls`:n.safeSql`nobypassrls`}
    ${void 0===_?n.safeSql``:n.safeSql`connection limit ${(0,n.literal)(_)}`}
    ${void 0===p?n.safeSql``:n.safeSql`password ${(0,n.literal)(p)}`}
    ${void 0===m?n.safeSql``:n.safeSql`valid until %L`}
  ', old.name${void 0===m?n.safeSql``:n.safeSql`, ${(0,n.literal)(m)}`}));

  ${void 0===a?n.safeSql``:n.safeSql`
  -- Using the same name in the rename clause gives an error, so only do it if the new name is different.
  if ${(0,n.literal)(a)} != old.name then
    execute(format('alter role %I rename to %I;', old.name, ${(0,n.literal)(a)}));
  end if;
  `}
end
$$;
`}},remove:function(e,{ifExists:t=!1}={}){return{sql:n.safeSql`
do $$
declare
  old record;
begin
  with roles as (${Z})
  select * into old from roles where ${en(e)};
  if old is null then
    raise exception 'Cannot find role with id %', id;
  end if;

  execute(format('drop role ${t?n.safeSql`if exists`:n.safeSql``} %I;', old.name));
end
$$;
`}},zod:ee}],567205);let ei=n.safeSql`
-- Adapted from information_schema.schemata

select
  n.oid as id,
  n.nspname as name,
  u.rolname as owner,
   obj_description(n.oid, 'pg_namespace') AS comment
from
  pg_namespace n,
  pg_roles u
where
  n.nspowner = u.oid
  and (
    pg_has_role(n.nspowner, 'USAGE')
    or has_schema_privilege(n.oid, 'CREATE, USAGE')
  )
  and not pg_catalog.starts_with(n.nspname, 'pg_temp_')
  and not pg_catalog.starts_with(n.nspname, 'pg_toast_temp_')
`,er=t.z.object({id:t.z.number(),name:t.z.string(),owner:t.z.string(),comment:t.z.string().nullable()}),el=t.z.array(er),es=t.z.optional(er);e.s(["default",0,{list:function({includeSystemSchemas:e=!1,limit:t,offset:i}={}){let r=ei;return e||(r=n.safeSql`${r} and not (n.nspname in (${(0,n.joinSqlFragments)(a.DEFAULT_SYSTEM_SCHEMAS.map(n.literal),",")}))`),t&&(r=n.safeSql`${r} limit ${(0,n.literal)(t)}`),i&&(r=n.safeSql`${r} offset ${(0,n.literal)(i)}`),{sql:r,zod:el}},retrieve:function({id:e,name:t}){return e?{sql:n.safeSql`${ei} and n.oid = ${(0,n.literal)(e)};`,zod:es}:{sql:n.safeSql`${ei} and n.nspname = ${(0,n.literal)(t)};`,zod:es}},create:function({name:e,owner:t}){return{sql:n.safeSql`create schema ${(0,n.ident)(e)}
  ${void 0===t?n.safeSql``:n.safeSql`authorization ${(0,n.ident)(t)}`};
`}},update:function({id:e,name:t},{name:a,owner:i}){return{sql:n.safeSql`
do $$
declare
  id oid := ${void 0===e?n.safeSql`${(0,n.literal)(t)}::regnamespace`:(0,n.literal)(e)};
  old record;
  new_name text := ${void 0===a?(0,n.literal)(null):(0,n.literal)(a)};
  new_owner text := ${void 0===i?(0,n.literal)(null):(0,n.literal)(i)};
begin
  select * into old from pg_namespace where oid = id;
  if old is null then
    raise exception 'Cannot find schema with id %', id;
  end if;

  if new_owner is not null then
    execute(format('alter schema %I owner to %I;', old.nspname, new_owner));
  end if;

  -- Using the same name in the rename clause gives an error, so only do it if the new name is different.
  if new_name is not null and new_name != old.nspname then
    execute(format('alter schema %I rename to %I;', old.nspname, new_name));
  end if;
end
$$;
`}},remove:function({id:e,name:t},{cascade:a=!1}={}){return{sql:n.safeSql`
do $$
declare
  id oid := ${void 0===e?n.safeSql`${(0,n.literal)(t)}::regnamespace`:(0,n.literal)(e)};
  old record;
  cascade bool := ${(0,n.literal)(a)};
begin
  select * into old from pg_namespace where oid = id;
  if old is null then
    raise exception 'Cannot find schema with id %', id;
  end if;

  execute(format('drop schema %I %s;', old.nspname, case when cascade then 'cascade' else 'restrict' end));
end
$$;
`}},zod:er}],912920);let eo=n.safeSql`
-- Despite the name \`table_privileges\`, this includes other kinds of relations:
-- views, matviews, etc. "Relation privileges" just doesn't roll off the tongue.
--
-- For each relation, get its relacl in a jsonb format,
-- e.g.
--
-- '{postgres=arwdDxt/postgres}'
--
-- becomes
--
-- [
--   {
--     "grantee": "postgres",
--     "grantor": "postgres",
--     "is_grantable": false,
--     "privilege_type": "INSERT"
--   },
--   ...
-- ]
select
  c.oid as relation_id,
  nc.nspname as schema,
  c.relname as name,
  case
    when c.relkind = 'r' then 'table'
    when c.relkind = 'v' then 'view'
    when c.relkind = 'm' then 'materialized_view'
    when c.relkind = 'f' then 'foreign_table'
    when c.relkind = 'p' then 'partitioned_table'
  end as kind,
  coalesce(
    jsonb_agg(
      jsonb_build_object(
        'grantor', grantor.rolname,
        'grantee', grantee.rolname,
        'privilege_type', _priv.privilege_type,
        'is_grantable', _priv.is_grantable
      )
    ) filter (where _priv is not null),
    '[]'
  ) as privileges
from pg_class c
join pg_namespace as nc
  on nc.oid = c.relnamespace
left join lateral (
  select grantor, grantee, privilege_type, is_grantable
  from aclexplode(coalesce(c.relacl, acldefault('r', c.relowner)))
) as _priv on true
left join pg_roles as grantor
  on grantor.oid = _priv.grantor
left join (
  select
    pg_roles.oid,
    pg_roles.rolname
  from pg_roles
  union all
  select
    (0)::oid as oid, 'PUBLIC'
) as grantee (oid, rolname)
  on grantee.oid = _priv.grantee
where c.relkind in ('r', 'v', 'm', 'f', 'p')
  and not pg_is_other_temp_schema(c.relnamespace)
  and (
    pg_has_role(c.relowner, 'USAGE')
    or has_table_privilege(
      c.oid,
      'SELECT, INSERT, UPDATE, DELETE, TRUNCATE, REFERENCES, TRIGGER'
      || case when current_setting('server_version_num')::int4 >= 170000 then ', MAINTAIN' else '' end
    )
    or has_any_column_privilege(c.oid, 'SELECT, INSERT, UPDATE, REFERENCES')
  )
group by
  c.oid,
  nc.nspname,
  c.relname,
  c.relkind
`,ec=t.z.object({relation_id:t.z.number(),schema:t.z.string(),name:t.z.string(),kind:t.z.union([t.z.literal("table"),t.z.literal("view"),t.z.literal("materialized_view"),t.z.literal("foreign_table"),t.z.literal("partitioned_table")]),privileges:t.z.array(t.z.object({grantor:t.z.string(),grantee:t.z.string(),privilege_type:t.z.union([t.z.literal("SELECT"),t.z.literal("INSERT"),t.z.literal("UPDATE"),t.z.literal("DELETE"),t.z.literal("TRUNCATE"),t.z.literal("REFERENCES"),t.z.literal("TRIGGER"),t.z.literal("MAINTAIN")]),is_grantable:t.z.boolean()}))}),ed=t.z.array(ec),e_=t.z.optional(ec);e.s(["default",0,{list:function({includeSystemSchemas:e=!1,includedSchemas:t,excludedSchemas:i,limit:l,offset:s}={}){let o=n.safeSql`
with table_privileges as (${eo})
select *
from table_privileges
`,c=r(t,i,e?void 0:a.DEFAULT_SYSTEM_SCHEMAS);return c&&(o=n.safeSql`${o} where schema ${c}`),l&&(o=n.safeSql`${o} limit ${(0,n.literal)(l)}`),s&&(o=n.safeSql`${o} offset ${(0,n.literal)(s)}`),{sql:o,zod:ed}},retrieve:function({id:e,name:t,schema:a="public"}){return e?{sql:n.safeSql`
with table_privileges as (${eo})
select *
from table_privileges
where table_privileges.relation_id = ${(0,n.literal)(e)};`,zod:e_}:{sql:n.safeSql`
with table_privileges as (${eo})
select *
from table_privileges
where table_privileges.schema = ${(0,n.literal)(a)}
  and table_privileges.name = ${(0,n.literal)(t)}
`,zod:e_}},grant:function(e){return{sql:n.safeSql`
do $$
begin
${(0,n.joinSqlFragments)(e.map(({privilegeType:e,relationId:t,grantee:a,isGrantable:i})=>n.safeSql`execute format('grant ${(0,n.keyword)(e)} on table %s to ${"public"===a.toLowerCase()?n.safeSql`public`:(0,n.ident)(a)} ${i?n.safeSql`with grant option`:n.safeSql``}', ${(0,n.literal)(t)}::regclass);`),"\n")}
end $$;
`}},revoke:function(e){return{sql:n.safeSql`
do $$
begin
${(0,n.joinSqlFragments)(e.map(({privilegeType:e,relationId:t,grantee:a})=>n.safeSql`execute format('revoke ${(0,n.keyword)(e)} on table %s from ${"public"===a.toLowerCase()?n.safeSql`public`:(0,n.ident)(a)}', ${(0,n.literal)(t)}::regclass);`),"\n")}
end $$;
`}},zod:ec}],454430);let ep=n.safeSql`
SELECT
  c.oid :: int8 AS id,
  nc.nspname AS schema,
  c.relname AS name,
  c.relrowsecurity AS rls_enabled,
  c.relforcerowsecurity AS rls_forced,
  CASE
    WHEN c.relreplident = 'd' THEN 'DEFAULT'
    WHEN c.relreplident = 'i' THEN 'INDEX'
    WHEN c.relreplident = 'f' THEN 'FULL'
    ELSE 'NOTHING'
  END AS replica_identity,
  pg_total_relation_size(format('%I.%I', nc.nspname, c.relname)) :: int8 AS bytes,
  pg_size_pretty(
    pg_total_relation_size(format('%I.%I', nc.nspname, c.relname))
  ) AS size,
  pg_stat_get_live_tuples(c.oid) AS live_rows_estimate,
  pg_stat_get_dead_tuples(c.oid) AS dead_rows_estimate,
  obj_description(c.oid) AS comment,
  coalesce(pk.primary_keys, '[]') as primary_keys,
  coalesce(
    jsonb_agg(relationships) filter (where relationships is not null),
    '[]'
  ) as relationships
FROM
  pg_namespace nc
  JOIN pg_class c ON nc.oid = c.relnamespace
  left join (
    select
      c.oid::int8 as table_id,
      jsonb_agg(
        jsonb_build_object(
          'table_id', c.oid::int8,
          'schema', n.nspname,
          'table_name', c.relname,
          'name', a.attname
        )
        order by array_position(i.indkey, a.attnum)
      ) as primary_keys
    from
      pg_index i
      join pg_class c on i.indrelid = c.oid
      join pg_namespace n on c.relnamespace = n.oid
      join pg_attribute a on a.attrelid = c.oid and a.attnum = any(i.indkey)
    where
      i.indisprimary
    group by c.oid
  ) as pk
  on pk.table_id = c.oid
  left join (
    select
      c.oid :: int8 as id,
      c.conname as constraint_name,
      nsa.nspname as source_schema,
      csa.relname as source_table_name,
      sa.attname as source_column_name,
      nta.nspname as target_table_schema,
      cta.relname as target_table_name,
      ta.attname as target_column_name
    from
      pg_constraint c
    join (
      pg_attribute sa
      join pg_class csa on sa.attrelid = csa.oid
      join pg_namespace nsa on csa.relnamespace = nsa.oid
    ) on sa.attrelid = c.conrelid and sa.attnum = any (c.conkey)
    join (
      pg_attribute ta
      join pg_class cta on ta.attrelid = cta.oid
      join pg_namespace nta on cta.relnamespace = nta.oid
    ) on ta.attrelid = c.confrelid and ta.attnum = any (c.confkey)
    where
      c.contype = 'f'
  ) as relationships
  on (relationships.source_schema = nc.nspname and relationships.source_table_name = c.relname)
  or (relationships.target_table_schema = nc.nspname and relationships.target_table_name = c.relname)
WHERE
  c.relkind IN ('r', 'p')
  AND NOT pg_is_other_temp_schema(nc.oid)
  AND (
    pg_has_role(c.relowner, 'USAGE')
    OR has_table_privilege(
      c.oid,
      'SELECT, INSERT, UPDATE, DELETE, TRUNCATE, REFERENCES, TRIGGER'
    )
    OR has_any_column_privilege(c.oid, 'SELECT, INSERT, UPDATE, REFERENCES')
  )
group by
  c.oid,
  c.relname,
  c.relrowsecurity,
  c.relforcerowsecurity,
  c.relreplident,
  nc.nspname,
  pk.primary_keys
`,em=t.z.object({table_id:t.z.number(),name:t.z.string(),schema:t.z.string(),table_name:t.z.string()}),eE=t.z.object({id:t.z.number(),constraint_name:t.z.string(),source_schema:t.z.string(),source_table_name:t.z.string(),source_column_name:t.z.string(),target_table_schema:t.z.string(),target_table_name:t.z.string(),target_column_name:t.z.string()}),eu=t.z.object({id:t.z.number(),schema:t.z.string(),name:t.z.string(),rls_enabled:t.z.boolean(),rls_forced:t.z.boolean(),replica_identity:t.z.enum(["DEFAULT","INDEX","FULL","NOTHING"]),bytes:t.z.number(),size:t.z.string(),live_rows_estimate:t.z.number(),dead_rows_estimate:t.z.number(),comment:t.z.string().nullable(),primary_keys:t.z.array(em),relationships:t.z.array(eE),columns:p.optional()}),ef=t.z.array(eu),eg=({includeColumns:e})=>n.safeSql`
  with tables as (${ep})
  ${e?n.safeSql`, columns as (${d})`:n.safeSql``}
  select
    *
    ${e?n.safeSql`, ${i("columns",n.safeSql`columns.table_id = tables.id`)}`:n.safeSql``}
  from tables`;e.s(["create",0,function({name:e,schema:t="public",comment:a,no_transaction:i=!1}){let r=n.safeSql`CREATE TABLE ${(0,n.ident)(t)}.${(0,n.ident)(e)} ();`,l=void 0!=a?n.safeSql`COMMENT ON TABLE ${(0,n.ident)(t)}.${(0,n.ident)(e)} IS ${(0,n.literal)(a)};`:n.safeSql``;return i?{sql:n.safeSql`${r} ${l}`}:{sql:n.safeSql`BEGIN; ${r} ${l} COMMIT;`}},"list",0,function({includeSystemSchemas:e=!1,includedSchemas:t,excludedSchemas:i,limit:l,offset:s,includeColumns:o=!0}={}){let c=eg({includeColumns:o}),d=r(t,i,e?void 0:a.DEFAULT_SYSTEM_SCHEMAS);return d&&(c=n.safeSql`${c} where schema ${d}`),l&&(c=n.safeSql`${c} limit ${(0,n.literal)(l)}`),s&&(c=n.safeSql`${c} offset ${(0,n.literal)(s)}`),{sql:c,zod:ef}},"remove",0,function(e,{cascade:t=!1}={}){return{sql:n.safeSql`DROP TABLE ${(0,n.ident)(e.schema)}.${(0,n.ident)(e.name)} ${t?n.safeSql`CASCADE`:n.safeSql`RESTRICT`};`}},"retrieve",0,function(e){let t=function(e){if("id"in e&&e.id)return n.safeSql`${(0,n.ident)("id")} = ${(0,n.literal)(e.id)}`;if("name"in e&&e.name&&e.schema)return n.safeSql`${(0,n.ident)("name")} = ${(0,n.literal)(e.name)} and ${(0,n.ident)("schema")} = ${(0,n.literal)(e.schema)}`;throw Error("Must provide either id or name and schema")}(e);return{sql:n.safeSql`${eg({includeColumns:!0})} where ${t};`,zod:eu}},"update",0,function(e,{name:t,schema:a,rls_enabled:i,rls_forced:r,replica_identity:l,replica_identity_index:s,primary_keys:o,comment:c}){let d=n.safeSql`ALTER TABLE ${(0,n.ident)(e.schema)}.${(0,n.ident)(e.name)}`,_=void 0===a?n.safeSql``:n.safeSql`${d} SET SCHEMA ${(0,n.ident)(a)};`,p=n.safeSql``;if(void 0!==t&&t!==e.name){let i=void 0===a?e.schema:a;p=n.safeSql`ALTER TABLE ${(0,n.ident)(i)}.${(0,n.ident)(e.name)} RENAME TO ${(0,n.ident)(t)};`}let m=n.safeSql``;if(void 0!==i){let e=n.safeSql`${d} ENABLE ROW LEVEL SECURITY;`,t=n.safeSql`${d} DISABLE ROW LEVEL SECURITY;`;m=i?e:t}let E=n.safeSql``;if(void 0!==r){let e=n.safeSql`${d} FORCE ROW LEVEL SECURITY;`,t=n.safeSql`${d} NO FORCE ROW LEVEL SECURITY;`;E=r?e:t}let u=n.safeSql``;if(void 0===l);else if("INDEX"===l){if(!s)throw Error("replica_identity_index is required when replica_identity is INDEX");u=n.safeSql`${d} REPLICA IDENTITY USING INDEX ${(0,n.ident)(s)};`}else u=n.safeSql`${d} REPLICA IDENTITY ${(0,n.keyword)(l)};`;let f=n.safeSql``;void 0===o||(f=n.safeSql`${f}
DO $$
DECLARE
  r record;
BEGIN
  SELECT conname
    INTO r
    FROM pg_constraint
    WHERE contype = 'p' AND conrelid = ${(0,n.literal)(e.id)};
  IF r IS NOT NULL THEN
    EXECUTE ${(0,n.literal)(`${d} DROP CONSTRAINT `)} || quote_ident(r.conname);
  END IF;
END
$$;
`,0===o.length||(f=n.safeSql`${f} ${d} ADD PRIMARY KEY (${(0,n.joinSqlFragments)(o.map(e=>(0,n.ident)(e.name)),",")});`));let g=void 0==c?n.safeSql``:n.safeSql`COMMENT ON TABLE ${(0,n.ident)(e.schema)}.${(0,n.ident)(e.name)} IS ${(0,n.literal)(c)};`;return{sql:n.safeSql`
BEGIN;
  ${m}
  ${E}
  ${u}
  ${f}
  ${g}
  ${_}
  ${p}
COMMIT;`}}],330006);let eS=n.safeSql`
SELECT
  pg_t.oid AS id,
  pg_t.tgrelid AS table_id,
  CASE
    WHEN pg_t.tgenabled = 'D' THEN 'DISABLED'
    WHEN pg_t.tgenabled = 'O' THEN 'ORIGIN'
    WHEN pg_t.tgenabled = 'R' THEN 'REPLICA'
    WHEN pg_t.tgenabled = 'A' THEN 'ALWAYS'
  END AS enabled_mode,
  (
    STRING_TO_ARRAY(
      ENCODE(pg_t.tgargs, 'escape'), '\\000'
    )
  )[:pg_t.tgnargs] AS function_args,
  is_t.trigger_name AS name,
  is_t.event_object_table AS table,
  is_t.event_object_schema AS schema,
  is_t.action_condition AS condition,
  is_t.action_orientation AS orientation,
  is_t.action_timing AS activation,
  ARRAY_AGG(is_t.event_manipulation)::text[] AS events,
  pg_p.proname AS function_name,
  pg_n.nspname AS function_schema
FROM
  pg_trigger AS pg_t
JOIN
  pg_class AS pg_c
ON pg_t.tgrelid = pg_c.oid
JOIN information_schema.triggers AS is_t
ON is_t.trigger_name = pg_t.tgname
AND pg_c.relname = is_t.event_object_table
AND pg_c.relnamespace = (quote_ident(is_t.event_object_schema))::regnamespace
JOIN pg_proc AS pg_p
ON pg_t.tgfoid = pg_p.oid
JOIN pg_namespace AS pg_n
ON pg_p.pronamespace = pg_n.oid
GROUP BY
  pg_t.oid,
  pg_t.tgrelid,
  pg_t.tgenabled,
  pg_t.tgargs,
  pg_t.tgnargs,
  is_t.trigger_name,
  is_t.event_object_table,
  is_t.event_object_schema,
  is_t.action_condition,
  is_t.action_orientation,
  is_t.action_timing,
  pg_p.proname,
  pg_n.nspname
`,eN=t.z.object({id:t.z.number(),table_id:t.z.number(),enabled_mode:t.z.enum(["DISABLED","ORIGIN","REPLICA","ALWAYS"]),function_args:t.z.array(t.z.string()),name:t.z.string(),table:t.z.string(),schema:t.z.string(),condition:t.z.string().nullable(),orientation:t.z.string(),activation:t.z.string(),events:t.z.array(t.z.string()),function_name:t.z.string(),function_schema:t.z.string()}),eb=t.z.array(eN),eT=t.z.optional(eN);t.z.object({name:t.z.string(),schema:t.z.string().optional().default("public"),table:t.z.string(),function_schema:t.z.string().optional().default("public"),function_name:t.z.string(),function_args:t.z.array(t.z.string()).optional(),activation:t.z.enum(["BEFORE","AFTER","INSTEAD OF"]),events:t.z.array(t.z.string()),orientation:t.z.enum(["ROW","STATEMENT"]).optional(),condition:t.z.string().optional()}),t.z.object({name:t.z.string().optional(),enabled_mode:t.z.enum(["ORIGIN","REPLICA","ALWAYS","DISABLED"]).optional()}),e.s(["default",0,{list:function({includeSystemSchemas:e=!1,includedSchemas:t,excludedSchemas:i,limit:l,offset:s}={}){let o=n.safeSql`with triggers as (${eS}) select * from triggers`,c=r(t,i,e?void 0:a.DEFAULT_SYSTEM_SCHEMAS);return c&&(o=n.safeSql`${o} where schema ${c}`),l&&(o=n.safeSql`${o} limit ${(0,n.literal)(l)}`),s&&(o=n.safeSql`${o} offset ${(0,n.literal)(s)}`),{sql:o,zod:eb}},retrieve:function(e){let t=function(e){if("id"in e&&e.id)return n.safeSql`${(0,n.ident)("id")} = ${(0,n.literal)(e.id)}`;if("name"in e&&e.name&&e.table&&e.schema)return n.safeSql`${(0,n.ident)("name")} = ${(0,n.literal)(e.name)} and ${(0,n.ident)("schema")} = ${(0,n.literal)(e.schema)} and ${(0,n.ident)("table")} = ${(0,n.literal)(e.table)}`;throw Error("Must provide either id or name, schema and table")}(e);return{sql:n.safeSql`with triggers as (${eS}) select * from triggers where ${t};`,zod:eT}},create:function({name:e,schema:a="public",table:i,function_schema:r="public",function_name:l,function_args:s=[],activation:o,events:c,orientation:d,condition:_}){let p=`${(0,n.ident)(a)}.${(0,n.ident)(i)}`,m=`${(0,n.ident)(r)}.${(0,n.ident)(l)}`,E=c.join(" or "),u=d?`for each ${d}`:"",f=_?`when (${_})`:"",g=s.map(n.literal).join(",");return{sql:`create trigger ${(0,n.ident)(e)} ${o} ${E} on ${p} ${u} ${f} execute function ${m}(${g});`,zod:t.z.void()}},update:function(e,a){let i=n.safeSql`${(0,n.ident)(e.schema)}.${(0,n.ident)(e.table)}`,r=n.safeSql``;switch(a.enabled_mode){case"ORIGIN":r=n.safeSql`alter table ${i} enable trigger ${(0,n.ident)(e.name)};`;break;case"DISABLED":r=n.safeSql`alter table ${i} disable trigger ${(0,n.ident)(e.name)};`;break;case"REPLICA":case"ALWAYS":r=n.safeSql`alter table ${i} enable ${(0,n.keyword)(a.enabled_mode)} trigger ${(0,n.ident)(e.name)};`}let l=a.name&&a.name!==e.name?n.safeSql`alter trigger ${(0,n.ident)(e.name)} on ${i} rename to ${(0,n.ident)(a.name)};`:n.safeSql``;return{sql:n.safeSql`begin; ${r}; ${l}; commit;`,zod:t.z.void()}},remove:function(e,{cascade:a=!1}={}){let i=n.safeSql`${(0,n.ident)(e.schema)}.${(0,n.ident)(e.table)}`;return{sql:n.safeSql`drop trigger ${(0,n.ident)(e.name)} on ${i} ${a?n.safeSql`cascade`:n.safeSql``};`,zod:t.z.void()}},zod:eN}],819615);let eh=n.safeSql`
select
  t.oid::int8 as id,
  t.typname as name,
  n.nspname as schema,
  format_type (t.oid, null) as format,
  coalesce(t_enums.enums, '[]') as enums,
  coalesce(t_attributes.attributes, '[]') as attributes,
  obj_description (t.oid, 'pg_type') as comment
from
  pg_type t
  left join pg_namespace n on n.oid = t.typnamespace
  left join (
    select
      enumtypid,
      jsonb_agg(enumlabel order by enumsortorder) as enums
    from
      pg_enum
    group by
      enumtypid
  ) as t_enums on t_enums.enumtypid = t.oid
  left join (
    select
      oid,
      jsonb_agg(
        jsonb_build_object('name', a.attname, 'type_id', a.atttypid::int8)
        order by a.attnum asc
      ) as attributes
    from
      pg_class c
      join pg_attribute a on a.attrelid = c.oid
    where
      c.relkind = 'c' and not a.attisdropped
    group by
      c.oid
  ) as t_attributes on t_attributes.oid = t.typrelid
where
  (
    t.typrelid = 0
    or (
      select
        c.relkind = 'c'
      from
        pg_class c
      where
        c.oid = t.typrelid
    )
  )
`,ev=t.z.object({id:t.z.number(),name:t.z.string(),schema:t.z.string(),format:t.z.string(),enums:t.z.array(t.z.string()),attributes:t.z.array(t.z.object({name:t.z.string(),type_id:t.z.number()})),comment:t.z.string().nullable()}),eA=t.z.array(ev);e.s(["default",0,{list:function({includeArrayTypes:e=!1,includeSystemSchemas:t=!1,includedSchemas:i,excludedSchemas:l,limit:s,offset:o}={}){let c=eh;e||(c=n.safeSql`${c} and not exists (
      select from pg_type el
      where el.oid = t.typelem
        and el.typarray = t.oid
    )`);let d=r(i,l,t?void 0:a.DEFAULT_SYSTEM_SCHEMAS);return d&&(c=n.safeSql`${c} and n.nspname ${d}`),s&&(c=n.safeSql`${c} limit ${(0,n.literal)(s)}`),o&&(c=n.safeSql`${c} offset ${(0,n.literal)(o)}`),{sql:c,zod:eA}},zod:ev}],211309);let eI=n.safeSql`
select
  version(),
  current_setting('server_version_num')::int8 as version_number,
  (
    select
      count(*) as active_connections
    from
      pg_stat_activity
  ) as active_connections,
  current_setting('max_connections')::int8 as max_connections
`,e$=t.z.object({version:t.z.string(),version_number:t.z.number(),active_connections:t.z.number(),max_connections:t.z.number()});e.s(["default",0,{retrieve:function(){return{sql:eI,zod:e$}},zod:e$}],267655);let eR=n.safeSql`
SELECT
  c.oid :: int8 AS id,
  n.nspname AS schema,
  c.relname AS name,
  (pg_relation_is_updatable(c.oid, false) & 20) = 20 AS is_updatable,
  obj_description(c.oid) AS comment
FROM
  pg_class c
  JOIN pg_namespace n ON n.oid = c.relnamespace
WHERE
  c.relkind = 'v'
`,eL=t.z.object({id:t.z.number(),schema:t.z.string(),name:t.z.string(),is_updatable:t.z.boolean(),comment:t.z.string().nullable(),columns:p.optional()}),eO=t.z.array(eL),ey=t.z.optional(eL),eq=({includeColumns:e})=>n.safeSql`
with views as (${eR})
  ${e?n.safeSql`, columns as (${d})`:n.safeSql``}
select
  *
  ${e?n.safeSql`, ${i("columns",n.safeSql`columns.table_id = views.id`)}`:n.safeSql``}
from views`;e.s(["default",0,{list:function({includeSystemSchemas:e=!1,includedSchemas:t,excludedSchemas:i,limit:l,offset:s,includeColumns:o=!0}={}){let c=eq({includeColumns:o}),d=r(t,i,e?void 0:a.DEFAULT_SYSTEM_SCHEMAS);return d&&(c=n.safeSql`${c} where schema ${d}`),l&&(c=n.safeSql`${c} limit ${(0,n.literal)(l)}`),s&&(c=n.safeSql`${c} offset ${(0,n.literal)(s)}`),{sql:c,zod:eO}},retrieve:function(e){let t=function(e){if("id"in e&&e.id)return n.safeSql`${(0,n.ident)("id")} = ${(0,n.literal)(e.id)}`;if("name"in e&&e.name&&e.schema)return n.safeSql`${(0,n.ident)("name")} = ${(0,n.literal)(e.name)} and ${(0,n.ident)("schema")} = ${(0,n.literal)(e.schema)}`;throw Error("Must provide either id or name and schema")}(e);return{sql:n.safeSql`${eq({includeColumns:!0})} where ${t};`,zod:ey}},zod:eL}],58347),e.s([],967533)},332357,e=>{"use strict";var t=e.i(479084);function a(e,a){return 0===a.length?e:e+=` where ${a.map(e=>{if(Array.isArray(e.column))switch(e.operator){case"in":var a,i,r=e;if(!Array.isArray(r.column))throw Error("Use inFilterSql for single columns");if(!Array.isArray(r.value))throw Error("Values for a tuple 'in' filter must be an array");let l=`(${r.column.map(e=>(0,t.ident)(e)).join(", ")})`,s=r.value.map(e=>{if(Array.isArray(e)){if(e.length!==r.column.length)throw Error("Tuple value length must match column length");return`(${e.map(e=>n(e)).join(", ")})`}{let t=String(e).split(",");if(t.length!==r.column.length)throw Error("Tuple value length must match column length");return`(${t.map(e=>n(e)).join(", ")})`}});return`${l} ${r.operator} (${s.join(", ")})`;case"=":case"<>":case">":case"<":case">=":case"<=":var o=e;if(!Array.isArray(o.column))throw Error("Use standard applyFilters for single column");if(!Array.isArray(o.value))throw Error("Tuple filter value must be an array");if(o.value.length!==o.column.length)throw Error("Tuple filter value must have the same length as the column array");let c=`(${o.column.map(e=>(0,t.ident)(e)).join(", ")})`,d=`(${o.value.map(e=>n(e)).join(", ")})`;return`${c} ${o.operator} ${d}`;default:throw Error(`Cannot use ${e.operator} operator in a tuple filter`)}switch(e.operator){case"in":let _;return _=Array.isArray((a=e).value)?a.value.map(e=>n(e)):String(a.value).split(",").map(e=>n(e)),`${(0,t.ident)(a.column)} ${a.operator} (${_.join(",")})`;case"is":var p=e;let m=String(p.value);switch(m){case"null":case"false":case"true":case"not null":return`${(0,t.ident)(p.column)} ${p.operator} ${m}`;default:return`${(0,t.ident)(p.column)} ${p.operator} ${n(p.value)}`}case"~~":case"~~*":case"!~~":case"!~~*":return i=e,`${(0,t.ident)(i.column)}::text ${i.operator} ${n(i.value)}`;default:return`${(0,t.ident)(e.column)} ${e.operator} ${n(e.value)}`}}).join(" and ")}`}function n(e){if("string"==typeof e&&!(e?.startsWith("ARRAY[")&&e?.endsWith("]")))return(0,t.literal)(e);return e}function i(e){return`${(0,t.ident)(e.schema)}.${(0,t.ident)(e.name)}`}e.s(["countQuery",0,function(e,t){let n=`select count(*) from ${i(e)}`,{filters:r}=t??{};return r&&(n=a(n,r)),n+";"},"deleteQuery",0,function(e,n,r){if(!n||0===n.length)throw Error("no filters for this delete query");let l=`delete from ${i(e)}`,{returning:s,enumArrayColumns:o}=r??{};return n&&(l=a(l,n)),s&&(l+=void 0===o||0===o.length?" returning *":` returning *, ${o.map(e=>`${(0,t.ident)(e)}::text[]`).join(",")}`),l+";"},"insertQuery",0,function(e,a,n){if(!a||0===a.length)throw Error("no value to insert");let{returning:r,enumArrayColumns:l}=n??{},s=Object.keys(a[0]).map(e=>(0,t.ident)(e)).join(","),o="";return o=0==s.length?(0,t.format)("insert into %1$s select from jsonb_populate_recordset(null::%1$s, %2$s)",i(e),(0,t.literal)(JSON.stringify(a))):(0,t.format)("insert into %1$s (%2$s) select %2$s from jsonb_populate_recordset(null::%1$s, %3$s)",i(e),s,(0,t.literal)(JSON.stringify(a))),r&&(o+=void 0===l||0===l.length?" returning *":` returning *, ${l.map(e=>`${(0,t.ident)(e)}::text[]`).join(",")}`),o+";"},"selectQuery",0,function(e,n,r,l=!0,s=!1){var o,c;let d,_="";_+=`select ${n??"*"} from ${s?(o=e,`${(0,t.ident)(o.name)}`):i(e)}`;let{filters:p,pagination:m,sorts:E}=r??{};if(p&&(_=a(_,p)),E&&(c=_,_=0===(d=E.filter(e=>e.column)).length?c:c+=` order by ${d.map(e=>{let a=e.ascending?"asc":"desc",n=e.nullsFirst?"nulls first":"nulls last";return`${(0,t.ident)(e.table)}.${(0,t.ident)(e.column)} ${a} ${n}`}).join(", ")}`),m){let{limit:e,offset:a}=m??{};_+=` limit ${(0,t.literal)(e)} offset ${(0,t.literal)(a)}`}return`${_}${l?";":""}`},"truncateQuery",0,function(e,t){let a=`truncate ${i(e)}`,{cascade:n}=t??{};return n&&(a+=" cascade"),a+";"},"updateQuery",0,function(e,n,r){let{filters:l,returning:s,enumArrayColumns:o}=r??{};if(!l||0===l.length)throw Error("no filters for this update query");let c=Object.keys(n).map(e=>(0,t.ident)(e)).join(","),d=(0,t.format)("update %1$s set (%2$s) = (select %2$s from json_populate_record(null::%1$s, %3$s))",i(e),c,(0,t.literal)(JSON.stringify(n)));return l&&(d=a(d,l)),s&&(d+=void 0===o||0===o.length?" returning *":` returning *, ${o.map(e=>`${(0,t.ident)(e)}::text[]`).join(",")}`),d+";"},"wrapWithRollback",0,function(e){return`
    begin;
 
    ${e}
    
    rollback;
  `},"wrapWithTransaction",0,function(e){return`
    begin;
 
    ${e}
    
    commit;
  `}])},721490,29659,193767,212695,e=>{"use strict";var t=e.i(332357);class a{table;action;options;pagination;constructor(e,t,a){this.table=e,this.action=t,this.options=a}range(e,t){return this.pagination={offset:e,limit:t-e+1},this}toSql(e={isCTE:!1,isFinal:!0}){try{let{actionValue:a,actionOptions:n,filters:i,sorts:r}=this.options??{};switch(this.action){case"count":return(0,t.countQuery)(this.table,{filters:i});case"delete":return(0,t.deleteQuery)(this.table,i,{returning:n?.returning,enumArrayColumns:n?.enumArrayColumns});case"insert":return(0,t.insertQuery)(this.table,a,{returning:n?.returning,enumArrayColumns:n?.enumArrayColumns});case"select":return(0,t.selectQuery)(this.table,a,{filters:i,pagination:this.pagination,sorts:r},e.isFinal,e.isCTE);case"update":return(0,t.updateQuery)(this.table,a,{filters:i,returning:n?.returning,enumArrayColumns:n?.enumArrayColumns});case"truncate":return(0,t.truncateQuery)(this.table,{cascade:n?.cascade});default:return""}}catch(e){throw e}}}e.s(["QueryModifier",0,a],29659);class n{table;action;actionValue;actionOptions;filters;sorts;constructor(e,t,a,n){this.table=e,this.action=t,this.actionValue=a,this.actionOptions=n,this.filters=[],this.sorts=[]}filter(e,t,a){return this.filters.push({column:e,operator:t,value:a}),this}match(e){return Object.entries(e).map(([e,t])=>{this.filters.push({column:e,operator:"=",value:t})}),this}order(e,t,a=!0,n=!1){return this.sorts.push({table:e,column:t,ascending:a,nullsFirst:n}),this}range(e,t){return this._getQueryModifier().range(e,t)}clone(){let e=structuredClone({table:this.table,action:this.action,actionValue:this.actionValue,actionOptions:this.actionOptions,filters:this.filters,sorts:this.sorts}),t=new n(e.table,e.action,e.actionValue,e.actionOptions);return t.filters=e.filters,t.sorts=e.sorts,t}toSql(e){return this._getQueryModifier().toSql(e)}_getQueryModifier(){return new a(this.table,this.action,{actionValue:this.actionValue,actionOptions:this.actionOptions,filters:this.filters,sorts:this.sorts})}}e.s(["QueryFilter",0,n],193767);class i{table;constructor(e){this.table=e}count(){return new n(this.table,"count")}delete(e){return new n(this.table,"delete",void 0,e)}insert(e,t){return new n(this.table,"insert",e,t)}select(e){return new n(this.table,"select",e)}update(e,t){return new n(this.table,"update",e,t)}truncate(e){return new n(this.table,"truncate",void 0,e)}}e.s(["QueryAction",0,i],212695),e.s(["Query",0,class{from(e,t){return new i({name:e,schema:t??"public"})}}],721490)},850036,247309,387578,640696,517638,53336,779262,538892,788035,e=>{"use strict";var t,a=e.i(976876),n=e.i(761087),i=e.i(486603),r=e.i(981263),l=e.i(254873),s=e.i(198687),o=e.i(673351),c=e.i(784883),d=e.i(201049),_=e.i(557928),p=e.i(567205),m=e.i(912920),E=e.i(454430),u=e.i(330006),f=e.i(819615),g=e.i(211309),S=e.i(267655),N=e.i(58347);e.i(967533);var b=e.i(721490),T=e.i(332357),h=e.i(193767),v=e.i(212695),A=e.i(29659);e.s(["Query",()=>b.Query,"QueryAction",()=>v.QueryAction,"QueryFilter",()=>h.QueryFilter,"QueryModifier",()=>A.QueryModifier,"countQuery",()=>T.countQuery,"deleteQuery",()=>T.deleteQuery,"insertQuery",()=>T.insertQuery,"selectQuery",()=>T.selectQuery,"truncateQuery",()=>T.truncateQuery,"updateQuery",()=>T.updateQuery,"wrapWithRollback",()=>T.wrapWithRollback,"wrapWithTransaction",()=>T.wrapWithTransaction],377171);var I=e.i(377171),$=e.i(479084);let R=$.safeSql`
CREATE OR REPLACE FUNCTION pg_temp.count_estimate(
    query text
) RETURNS integer LANGUAGE plpgsql AS $$
DECLARE
    plan jsonb;
BEGIN
    EXECUTE 'EXPLAIN (FORMAT JSON)' || query INTO plan;
    RETURN plan->0->'Plan'->'Plan Rows';
END;
$$;
`;function L(e,t){let a="00000000-0000-0000-0000-000000000000".split("").map((t,a)=>"-"===t?t:e[a]??t);if(e.length>=a.length)return a.join("");if(e.length&&e.length<15&&(a[14]="4"),e.length&&e.length<20&&(a[19]=t?"b":"8"),t)for(let t=e.length;t<a.length;t+=1)"0"===a[t]&&(a[t]="f");return a.join("")}function O(e){if(!e)return[e,void 0];let t=e.charCodeAt(e.length-1);if(122===t)return[e,e+"~"];if(t>=126)return[e,e+" "];let a=e.substring(0,e.length-1)+String.fromCharCode(t+1);return[e,a]}e.s(["COUNT_ESTIMATE_SQL",0,R,"THRESHOLD_COUNT",0,5e4],247309),e.s(["prefixToUUID",0,L,"stringRange",0,O],387578);let y=$.safeSql`select reltuples as estimate from pg_class where oid = 'auth.users'::regclass`;e.s(["getUsersCountSQL",0,({filter:e,keywords:t,providers:a,forceExactCount:n=!1,column:i})=>{let r=t&&""!==t,l=[],s=$.safeSql`select count(*) from auth.users`,o=$.safeSql`select * from auth.users`;if(i&&r){if("email"===i){let e=O(t),a=(0,$.literal)(e[0]),n=e[1]?(0,$.literal)(e[1]):null;l.push($.safeSql`lower(email) >= ${a}${n?$.safeSql` and lower(email) < ${n}`:$.safeSql``} and instance_id = '00000000-0000-0000-0000-000000000000'::uuid`)}else if("phone"===i){let e=O(t),a=(0,$.literal)(e[0]),n=e[1]?(0,$.literal)(e[1]):null;l.push($.safeSql`phone >= ${a}${n?$.safeSql` and phone < ${n}`:$.safeSql``}`)}else if("id"===i){let e=L(t,!1);if(e===t)l.push($.safeSql`id = ${(0,$.literal)(t)}`);else{let a=L(t,!0);l.push($.safeSql`id >= ${(0,$.literal)(e)} and id < ${(0,$.literal)(a)}`)}}}else{if(r){let e=(0,$.literal)(`%${t}%`);l.push($.safeSql`id::text ilike ${e} or email ilike ${e} or phone ilike ${e}`)}if("verified"===e?l.push($.safeSql`email_confirmed_at IS NOT NULL or phone_confirmed_at IS NOT NULL`):"anonymous"===e?l.push($.safeSql`is_anonymous is true`):"unverified"===e&&l.push($.safeSql`email_confirmed_at IS NULL AND phone_confirmed_at IS NULL`),a&&a.length>0)if(a.includes("saml 2.0")){let e=a.map(e=>"saml 2.0"===e?"sso":e);l.push($.safeSql`(select jsonb_agg(case when value ~ '^sso' then 'sso' else value end) from jsonb_array_elements_text((raw_app_meta_data ->> 'providers')::jsonb)) ?| array[${(0,$.literal)(e)}]`)}else l.push($.safeSql`(raw_app_meta_data->>'providers')::jsonb ?| array[${(0,$.literal)(a)}]`)}let c=(0,$.joinSqlFragments)(l.map(e=>$.safeSql`(${e})`)," and "),d=l.length>0?$.safeSql` where ${c}`:$.safeSql``;if(n)return $.safeSql`select (${s}${d}), false as is_estimate;`;{let e=$.safeSql`${o}${d}`,t=$.safeSql`${s}${d}`,a=(0,$.literal)(e);return $.safeSql`${R}

with approximation as (${y})
select 
  case 
    when estimate = -1 then (select pg_temp.count_estimate(${a}))::int
    when estimate > ${(0,$.literal)(5e4)} then ${l.length>0?$.safeSql`(select pg_temp.count_estimate(${a}))::int`:$.safeSql`estimate::int`}
    else (${t})
  end as count,
  estimate = -1 or estimate > ${(0,$.literal)(5e4)} as is_estimate
from approximation`}}],640696);let q=$.safeSql`
SELECT id, name, file_size_limit
FROM storage.buckets
WHERE file_size_limit IS NOT NULL
ORDER BY file_size_limit DESC
LIMIT ${(0,$.literal)(51)};
`;e.s(["LARGEST_SIZE_LIMIT_BUCKETS_COUNT",0,50,"getLargestSizeLimitBucketsSqlUnoptimized",0,q],517638),e.s(["getDatabaseExtensionsSQL",0,()=>$.safeSql`
SELECT
  e.name,
  n.nspname AS schema,
  e.default_version,
  x.extversion AS installed_version,
  e.comment,
  ev.schema AS default_version_schema
FROM
  pg_available_extensions e
  LEFT JOIN pg_extension x ON e.name = x.extname
  LEFT JOIN pg_namespace n ON x.extnamespace = n.oid
  LEFT JOIN pg_available_extension_versions ev
    ON ev.name = e.name AND ev.version = e.default_version;
`,"getEnableDatabaseExtensionSQL",0,({schema:e,name:t,version:a,cascade:n,createSchema:i=!1})=>{let{sql:l}=r.default.create({schema:e,name:t,version:a,cascade:n});return i?$.safeSql`CREATE SCHEMA IF NOT EXISTS ${(0,$.ident)(e)};
${l}`:l}],53336),e.s(["getTableRowsCountSql",0,({table:e,filters:t=[],enforceExactCount:a=!1,isUsingReadReplica:n=!1})=>{if(!e)return"";if(a){let a=new b.Query().from(e.name,e.schema??void 0).count();return t.filter(e=>e.value&&""!==e.value).forEach(e=>{a=a.filter(e.column,e.operator,e.value)}),`select (${a.toSql().slice(0,-1)}), false as is_estimate;`}{let a=new b.Query().from(e.name,e.schema??void 0).select("*");t.filter(e=>e.value&&""!=e.value).forEach(e=>{a=a.filter(e.column,e.operator,e.value)});let i=a.toSql(),r=new b.Query().from(e.name,e.schema??void 0).count();t.filter(e=>e.value&&""!=e.value).forEach(e=>{r=r.filter(e.column,e.operator,e.value)});let l=r.toSql().slice(0,-1);return n?`
with approximation as (
    select reltuples as estimate
    from pg_class
    where oid = ${e.id}
)
select 
  case 
    when estimate > 50000 then (select -1)
    else (${l})
  end as count,
  estimate > 50000 as is_estimate
from approximation;
`.trim():`
${R}

with approximation as (
    select reltuples as estimate
    from pg_class
    where oid = ${e.id}
)
select 
  case 
    when estimate > 50000 then ${t.length>0?`pg_temp.count_estimate('${i.replaceAll("'","''")}')`:"estimate"}
    else (${l})
  end as count,
  estimate > 50000 as is_estimate
from approximation;
`.trim()}}],779262);let C=`
  DROP TYPE IF EXISTS pg_temp.tabledefs CASCADE;
  CREATE TYPE pg_temp.tabledefs AS ENUM ('PKEY_INTERNAL','PKEY_EXTERNAL','FKEYS_INTERNAL', 'FKEYS_EXTERNAL', 'COMMENTS', 'FKEYS_NONE', 'INCLUDE_TRIGGERS', 'NO_TRIGGERS');

  -- SELECT * FROM pg_temp.pg_get_coldef('sample','orders','id');
  -- DROP FUNCTION pg_temp.pg_get_coldef(text,text,text,boolean);
  CREATE OR REPLACE FUNCTION pg_temp.pg_get_coldef(
    in_schema text,
    in_table  text,
    in_column text,
    oldway    boolean default False
  )
  RETURNS text
  LANGUAGE plpgsql VOLATILE
  AS
  $$
  DECLARE
  v_coldef     text;
  v_dt1        text;
  v_dt2        text;
  v_dt3        text;
  v_nullable   boolean;
  v_position   int;
  v_identity   text;
  v_generated  text;
  v_hasdflt    boolean;
  v_dfltexpr   text;

  BEGIN
    IF oldway THEN
      SELECT pg_catalog.format_type(a.atttypid, a.atttypmod) INTO v_coldef FROM pg_namespace n, pg_class c, pg_attribute a, pg_type t
      WHERE n.nspname = in_schema AND n.oid = c.relnamespace AND c.relname = in_table AND a.attname = in_column and a.attnum > 0 AND a.attrelid = c.oid AND a.atttypid = t.oid ORDER BY a.attnum;
      -- RAISE NOTICE 'DEBUG: oldway=%',v_coldef;
    ELSE
      -- a.attrelid::regclass::text, a.attname
      SELECT CASE WHEN a.atttypid = ANY ('{int,int8,int2}'::regtype[]) AND EXISTS (SELECT FROM pg_attrdef ad WHERE ad.adrelid = a.attrelid AND ad.adnum   = a.attnum AND
      pg_get_expr(ad.adbin, ad.adrelid) = 'nextval(''' || (pg_get_serial_sequence (a.attrelid::regclass::text, a.attname))::regclass || '''::regclass)') THEN CASE a.atttypid
      WHEN 'int'::regtype  THEN 'serial' WHEN 'int8'::regtype THEN 'bigserial' WHEN 'int2'::regtype THEN 'smallserial' END ELSE format_type(a.atttypid, a.atttypmod) END AS data_type
      INTO v_coldef FROM pg_namespace n, pg_class c, pg_attribute a, pg_type t
      WHERE n.nspname = in_schema AND n.oid = c.relnamespace AND c.relname = in_table AND a.attname = in_column and a.attnum > 0 AND a.attrelid = c.oid AND a.atttypid = t.oid ORDER BY a.attnum;
      -- RAISE NOTICE 'DEBUG: newway=%',v_coldef;

      -- Issue#24: not implemented yet
      -- might replace with this below to do more detailed parsing...
      -- SELECT a.atttypid::regtype AS dt1, format_type(a.atttypid, a.atttypmod) as dt2, t.typname as dt3, CASE WHEN not(a.attnotnull) THEN True ELSE False END AS nullable,
      -- a.attnum, a.attidentity, a.attgenerated, a.atthasdef, pg_get_expr(ad.adbin, ad.adrelid) dfltexpr
      -- INTO v_dt1, v_dt2, v_dt3, v_nullable, v_position, v_identity, v_generated, v_hasdflt, v_dfltexpr
      -- FROM pg_attribute a JOIN pg_class c ON (a.attrelid = c.oid) JOIN pg_type t ON (a.atttypid = t.oid) LEFT JOIN pg_attrdef ad ON (a.attrelid = ad.adrelid AND a.attnum = ad.adnum)
      -- WHERE c.relkind in ('r','p') AND a.attnum > 0 AND NOT a.attisdropped AND c.relnamespace::regnamespace::text = in_schema AND c.relname = in_table AND a.attname = in_column;
      -- RAISE NOTICE 'schema=%  table=%  column=%  dt1=%  dt2=%  dt3=%  nullable=%  pos=%  identity=%   generated=%  HasDefault=%  DeftExpr=%', in_schema, in_table, in_column, v_dt1,v_dt2,v_dt3,v_nullable,v_position,v_identity,v_generated,v_hasdflt,v_dfltexpr;
    END IF;
    RETURN v_coldef;
  END;
  $$;

  -- SELECT * FROM pg_temp.pg_get_tabledef('sample', 'address', false);
  DROP FUNCTION IF EXISTS pg_temp.pg_get_tabledef(character varying,character varying,boolean,tabledefs[]);
  CREATE OR REPLACE FUNCTION pg_temp.pg_get_tabledef(
    in_schema varchar,
    in_table varchar,
    _verbose boolean,
    VARIADIC arr pg_temp.tabledefs[] DEFAULT '{}':: pg_temp.tabledefs[]
  )
  RETURNS text
  LANGUAGE plpgsql VOLATILE
  AS
  $$
    DECLARE
      v_qualified text := '';
      v_table_ddl text;
      v_table_oid int;
      v_colrec record;
      v_constraintrec record;
      v_trigrec       record;
      v_indexrec record;
      v_rec           record;
      v_constraint_name text;
      v_constraint_def  text;
      v_pkey_def        text := '';
      v_fkey_def        text := '';
      v_fkey_defs       text := '';
      v_trigger text := '';
      v_partition_key text := '';
      v_partbound text;
      v_parent text;
      v_parent_schema text;
      v_persist text;
      v_temp  text := '';
      v_temp2 text;
      v_relopts text;
      v_tablespace text;
      v_pgversion int;
      bSerial boolean;
      bPartition boolean;
      bInheritance boolean;
      bRelispartition boolean;
      constraintarr text[] := '{}';
      constraintelement text;
      bSkip boolean;
      bVerbose boolean := False;
      v_cnt1   integer;
      v_cnt2   integer;
      search_path_old text := '';
      search_path_new text := '';
      v_partial    boolean;
      v_pos        integer;

      -- assume defaults for ENUMs at the getgo
      pkcnt            int := 0;
      fkcnt            int := 0;
      trigcnt          int := 0;
      cmtcnt           int := 0;
      pktype           pg_temp.tabledefs := 'PKEY_INTERNAL';
      fktype           pg_temp.tabledefs := 'FKEYS_INTERNAL';
      trigtype         pg_temp.tabledefs := 'NO_TRIGGERS';
      arglen           integer;
      vargs            text;
      avarg            pg_temp.tabledefs;

      -- exception variables
      v_ret            text;
      v_diag1          text;
      v_diag2          text;
      v_diag3          text;
      v_diag4          text;
      v_diag5          text;
      v_diag6          text;

    BEGIN
      SET client_min_messages = 'notice';
      IF _verbose THEN bVerbose = True; END IF;

      -- v17 fix: handle case-sensitive
      -- v_qualified = in_schema || '.' || in_table;

      arglen := array_length($4, 1);
      IF arglen IS NULL THEN
          -- nothing to do, so assume defaults
          NULL;
      ELSE
          -- loop thru args
          -- IF 'NO_TRIGGERS' = ANY ($4)
          -- select array_to_string($4, ',', '***') INTO vargs;
          IF bVerbose THEN RAISE NOTICE 'arguments=%', $4; END IF;
          FOREACH avarg IN ARRAY $4 LOOP
              IF bVerbose THEN RAISE NOTICE 'arg=%', avarg; END IF;
              IF avarg = 'FKEYS_INTERNAL' OR avarg = 'FKEYS_EXTERNAL' OR avarg = 'FKEYS_NONE' THEN
                  fkcnt = fkcnt + 1;
                  fktype = avarg;
              ELSEIF avarg = 'INCLUDE_TRIGGERS' OR avarg = 'NO_TRIGGERS' THEN
                  trigcnt = trigcnt + 1;
                  trigtype = avarg;
              ELSEIF avarg = 'PKEY_EXTERNAL' THEN
                  pkcnt = pkcnt + 1;
                  pktype = avarg;
              ELSEIF avarg = 'COMMENTS' THEN
                  cmtcnt = cmtcnt + 1;

              END IF;
          END LOOP;
          IF fkcnt > 1 THEN
              RAISE WARNING 'Only one foreign key option can be provided. You provided %', fkcnt;
              RETURN '';
          ELSEIF trigcnt > 1 THEN
              RAISE WARNING 'Only one trigger option can be provided. You provided %', trigcnt;
              RETURN '';
          ELSEIF pkcnt > 1 THEN
              RAISE WARNING 'Only one pkey option can be provided. You provided %', pkcnt;
              RETURN '';
          ELSEIF cmtcnt > 1 THEN
              RAISE WARNING 'Only one comments option can be provided. You provided %', cmtcnt;
              RETURN '';

          END IF;
      END IF;

      SELECT c.oid, (select setting from pg_settings where name = 'server_version_num') INTO v_table_oid, v_pgversion FROM pg_catalog.pg_class c LEFT JOIN pg_catalog.pg_namespace n ON n.oid = c.relnamespace
      WHERE c.relkind in ('r','p') AND c.relname = in_table AND n.nspname = in_schema;

    -- set search_path = public before we do anything to force explicit schema qualification but dont forget to set it back before exiting...
      SELECT setting INTO search_path_old FROM pg_settings WHERE name = 'search_path';

      -- RAISE NOTICE 'DEBUG tableddl: saving old search_path: ***%***', search_path_old;
      EXECUTE 'SET search_path = "public"';
      SELECT setting INTO search_path_new FROM pg_settings WHERE name = 'search_path';
      -- RAISE NOTICE 'DEBUG tableddl: using new search path=***%***', search_path_new;

      -- throw an error if table was not found
      IF (v_table_oid IS NULL) THEN
        RAISE EXCEPTION 'table does not exist';
      END IF;

      -- get user-defined tablespaces if applicable
      SELECT tablespace INTO v_temp FROM pg_tables WHERE schemaname = in_schema and tablename = in_table and tablespace IS NOT NULL;
      IF v_temp IS NULL THEN
        v_tablespace := 'TABLESPACE pg_default';
      ELSE
        v_tablespace := 'TABLESPACE ' || v_temp;
      END IF;

      -- also see if there are any SET commands for this table, ie, autovacuum_enabled=off, fillfactor=70
      WITH relopts AS (SELECT unnest(c.reloptions) relopts FROM pg_class c, pg_namespace n WHERE n.nspname = in_schema and n.oid = c.relnamespace and c.relname = in_table)
      SELECT string_agg(r.relopts, ', ') as relopts INTO v_temp from relopts r;
      IF v_temp IS NULL THEN
        v_relopts := '';
      ELSE
        v_relopts := ' WITH (' || v_temp || ')';
      END IF;

      -- -----------------------------------------------------------------------------------
      -- Create table defs for partitions/children using inheritance or declarative methods.
      -- inheritance: pg_class.relkind = 'r'   pg_class.relispartition=false   pg_class.relpartbound is NULL
      -- declarative: pg_class.relkind = 'r'   pg_class.relispartition=true    pg_class.relpartbound is NOT NULL
      -- -----------------------------------------------------------------------------------
      v_partbound := '';
      bPartition := False;
      bInheritance := False;
      IF v_pgversion < 100000 THEN
        -- Issue#11: handle parent schema
        SELECT c2.relname parent, c2.relnamespace::regnamespace INTO v_parent, v_parent_schema from pg_class c1, pg_namespace n, pg_inherits i, pg_class c2
        WHERE n.nspname = in_schema and n.oid = c1.relnamespace and c1.relname = in_table and c1.oid = i.inhrelid and i.inhparent = c2.oid and c1.relkind = 'r';
        IF (v_parent IS NOT NULL) THEN
          bPartition   := True;
          bInheritance := True;
        END IF;
      ELSE
        -- Issue#11: handle parent schema
        SELECT c2.relname parent, c1.relispartition, pg_get_expr(c1.relpartbound, c1.oid, true), c2.relnamespace::regnamespace INTO v_parent, bRelispartition, v_partbound, v_parent_schema from pg_class c1, pg_namespace n, pg_inherits i, pg_class c2
        WHERE n.nspname = in_schema and n.oid = c1.relnamespace and c1.relname = in_table and c1.oid = i.inhrelid and i.inhparent = c2.oid and c1.relkind = 'r';
        IF (v_parent IS NOT NULL) THEN
          bPartition   := True;
          IF bRelispartition THEN
            bInheritance := False;
          ELSE
            bInheritance := True;
          END IF;
        END IF;
      END IF;
      IF bPartition THEN
        --Issue#17 fix for case-sensitive tables
        -- SELECT count(*) INTO v_cnt1 FROM information_schema.tables t WHERE EXISTS (SELECT REGEXP_MATCHES(s.table_name, '([A-Z]+)','g') FROM information_schema.tables s
        -- WHERE t.table_schema=s.table_schema AND t.table_name=s.table_name AND t.table_schema = quote_ident(in_schema) AND t.table_name = quote_ident(in_table) AND t.table_type = 'BASE TABLE');
        SELECT count(*) INTO v_cnt1 FROM information_schema.tables t WHERE EXISTS (SELECT REGEXP_MATCHES(s.table_name, '([A-Z]+)','g') FROM information_schema.tables s
        WHERE t.table_schema=s.table_schema AND t.table_name=s.table_name AND t.table_schema = in_schema AND t.table_name = in_table AND t.table_type = 'BASE TABLE');

        --Issue#19 put double-quotes around SQL keyword column names
        -- Issue#121: fix keyword lookup for table name not column name that does not apply here
        -- SELECT COUNT(*) INTO v_cnt2 FROM pg_get_keywords() WHERE word = v_colrec.column_name AND catcode = 'R';
        SELECT COUNT(*) INTO v_cnt2 FROM pg_get_keywords() WHERE word = in_table AND catcode = 'R';

        IF bInheritance THEN
          -- inheritance-based
          IF v_cnt1 > 0 OR v_cnt2 > 0 THEN
            v_table_ddl := 'CREATE TABLE ' || in_schema || '."' || in_table || '"( '|| E'\\n';
          ELSE
            v_table_ddl := 'CREATE TABLE ' || in_schema || '.' || in_table || '( '|| E'\\n';
          END IF;

          -- Jump to constraints section to add the check constraints
        ELSE
          -- declarative-based
          IF v_relopts <> '' THEN
            IF v_cnt1 > 0 OR v_cnt2 > 0 THEN
              v_table_ddl := 'CREATE TABLE ' || in_schema || '."' || in_table || '" PARTITION OF ' || in_schema || '.' || v_parent || ' ' || v_partbound || v_relopts || ' ' || v_tablespace || '; ' || E'\\n';
            ELSE
              v_table_ddl := 'CREATE TABLE ' || in_schema || '.' || in_table || ' PARTITION OF ' || in_schema || '.' || v_parent || ' ' || v_partbound || v_relopts || ' ' || v_tablespace || '; ' || E'\\n';
            END IF;
          ELSE
            IF v_cnt1 > 0 OR v_cnt2 > 0 THEN
              v_table_ddl := 'CREATE TABLE ' || in_schema || '."' || in_table || '" PARTITION OF ' || in_schema || '.' || v_parent || ' ' || v_partbound || ' ' || v_tablespace || '; ' || E'\\n';
            ELSE
              v_table_ddl := 'CREATE TABLE ' || in_schema || '.' || in_table || ' PARTITION OF ' || in_schema || '.' || v_parent || ' ' || v_partbound || ' ' || v_tablespace || '; ' || E'\\n';
            END IF;
          END IF;
          -- Jump to constraints and index section to add the check constraints and indexes and perhaps FKeys
        END IF;
      END IF;
      IF bVerbose THEN RAISE NOTICE '(1)tabledef so far: %', v_table_ddl; END IF;

      IF NOT bPartition THEN
        -- see if this is unlogged or temporary table
        select c.relpersistence into v_persist from pg_class c, pg_namespace n where n.nspname = in_schema and n.oid = c.relnamespace and c.relname = in_table and c.relkind = 'r';
        IF v_persist = 'u' THEN
          v_temp := 'UNLOGGED';
        ELSIF v_persist = 't' THEN
          v_temp := 'TEMPORARY';
        ELSE
          v_temp := '';
        END IF;
      END IF;

      -- start the create definition for regular tables unless we are in progress creating an inheritance-based child table
      IF NOT bPartition THEN
        --Issue#17 fix for case-sensitive tables
        -- SELECT count(*) INTO v_cnt1 FROM information_schema.tables t WHERE EXISTS (SELECT REGEXP_MATCHES(s.table_name, '([A-Z]+)','g') FROM information_schema.tables s
        -- WHERE t.table_schema=s.table_schema AND t.table_name=s.table_name AND t.table_schema = quote_ident(in_schema) AND t.table_name = quote_ident(in_table) AND t.table_type = 'BASE TABLE');
        SELECT count(*) INTO v_cnt1 FROM information_schema.tables t WHERE EXISTS (SELECT REGEXP_MATCHES(s.table_name, '([A-Z]+)','g') FROM information_schema.tables s
        WHERE t.table_schema=s.table_schema AND t.table_name=s.table_name AND t.table_schema = in_schema AND t.table_name = in_table AND t.table_type = 'BASE TABLE');
        IF v_cnt1 > 0 THEN
          v_table_ddl := 'CREATE ' || v_temp || ' TABLE ' || in_schema || '."' || in_table || '" (' || E'\\n';
        ELSE
          v_table_ddl := 'CREATE ' || v_temp || ' TABLE ' || in_schema || '.' || in_table || ' (' || E'\\n';
        END IF;
      END IF;
      -- RAISE NOTICE 'DEBUG2: tabledef so far: %', v_table_ddl;
      -- define all of the columns in the table unless we are in progress creating an inheritance-based child table
      IF NOT bPartition THEN
        FOR v_colrec IN
          SELECT c.column_name, c.data_type, c.udt_name, c.udt_schema, c.character_maximum_length, c.is_nullable, c.column_default, c.numeric_precision, c.numeric_scale, c.is_identity, c.identity_generation, c.is_generated, c.generation_expression
          FROM information_schema.columns c WHERE (table_schema, table_name) = (in_schema, in_table) ORDER BY ordinal_position
        LOOP
          IF bVerbose THEN RAISE NOTICE '(col loop) name=%  type=%  udt_name=%  default=%  is_generated=%  gen_expr=%', v_colrec.column_name, v_colrec.data_type, v_colrec.udt_name, v_colrec.column_default, v_colrec.is_generated, v_colrec.generation_expression; END IF;

          -- v17 fix: handle case-sensitive for pg_get_serial_sequence that requires SQL Identifier handling
          -- SELECT CASE WHEN pg_get_serial_sequence(v_qualified, v_colrec.column_name) IS NOT NULL THEN True ELSE False END into bSerial;
          SELECT CASE WHEN pg_get_serial_sequence(quote_ident(in_schema) || '.' || quote_ident(in_table), v_colrec.column_name) IS NOT NULL THEN True ELSE False END into bSerial;
          IF bVerbose THEN
            -- v17 fix: handle case-sensitive for pg_get_serial_sequence that requires SQL Identifier handling
            -- SELECT pg_get_serial_sequence(v_qualified, v_colrec.column_name) into v_temp;
            SELECT pg_get_serial_sequence(quote_ident(in_schema) || '.' || quote_ident(in_table), v_colrec.column_name) into v_temp;
            IF v_temp IS NULL THEN v_temp = 'NA'; END IF;
            SELECT pg_temp.pg_get_coldef(in_schema, in_table,v_colrec.column_name) INTO v_diag1;
            RAISE NOTICE 'DEBUG table: %  Column: %  datatype: %  Serial=%  serialval=%  coldef=%', v_qualified, v_colrec.column_name, v_colrec.data_type, bSerial, v_temp, v_diag1;
            RAISE NOTICE 'DEBUG tabledef: %', v_table_ddl;
          END IF;

          --Issue#17 put double-quotes around case-sensitive column names
          SELECT COUNT(*) INTO v_cnt1 FROM information_schema.columns t WHERE EXISTS (SELECT REGEXP_MATCHES(s.column_name, '([A-Z]+)','g') FROM information_schema.columns s
          WHERE t.table_schema=s.table_schema and t.table_name=s.table_name and t.column_name=s.column_name AND t.table_schema = quote_ident(in_schema) AND column_name = v_colrec.column_name);

          --Issue#19 put double-quotes around SQL keyword column names
          SELECT COUNT(*) INTO v_cnt2 FROM pg_get_keywords() WHERE word = v_colrec.column_name AND catcode = 'R';

          IF v_cnt1 > 0 OR v_cnt2 > 0 THEN
            v_table_ddl := v_table_ddl || '  "' || v_colrec.column_name || '" ';
          ELSE
            v_table_ddl := v_table_ddl || '  ' || v_colrec.column_name || ' ';
          END IF;

          -- Issue#23: Handle autogenerated columns and rewrite as a simpler IF THEN ELSE branch instead of a much more complex embedded CASE STATEMENT
          IF v_colrec.is_generated = 'ALWAYS' and v_colrec.generation_expression IS NOT NULL THEN
              -- searchable tsvector GENERATED ALWAYS AS (to_tsvector('simple'::regconfig, COALESCE(translate(email, '@.-'::citext, ' '::text), ''::text)) ) STORED
              v_temp = v_colrec.data_type || ' GENERATED ALWAYS AS (' || v_colrec.generation_expression || ') STORED ';
          ELSEIF v_colrec.udt_name in ('geometry', 'box2d', 'box2df', 'box3d', 'geography', 'geometry_dump', 'gidx', 'spheroid', 'valid_detail') THEN
              v_temp = v_colrec.udt_name;
          ELSEIF v_colrec.data_type = 'USER-DEFINED' THEN
              v_temp = v_colrec.udt_schema || '.' || v_colrec.udt_name;
          ELSEIF v_colrec.data_type = 'ARRAY' THEN
                -- Issue#6 fix: handle arrays
              v_temp = pg_temp.pg_get_coldef(in_schema, in_table,v_colrec.column_name);
              -- v17 fix: handle case-sensitive for pg_get_serial_sequence that requires SQL Identifier handling
              -- WHEN pg_get_serial_sequence(v_qualified, v_colrec.column_name) IS NOT NULL
          ELSEIF pg_get_serial_sequence(quote_ident(in_schema) || '.' || quote_ident(in_table), v_colrec.column_name) IS NOT NULL THEN
              -- Issue#8 fix: handle serial. Note: NOT NULL is implied so no need to declare it explicitly
              v_temp = pg_temp.pg_get_coldef(in_schema, in_table,v_colrec.column_name);
          ELSE
              v_temp = v_colrec.data_type;
          END IF;
          -- RAISE NOTICE 'column def1=%', v_temp;

          -- handle IDENTITY columns
          IF v_colrec.is_identity = 'YES' THEN
              IF v_colrec.identity_generation = 'ALWAYS' THEN
                  v_temp = v_temp || ' GENERATED ALWAYS AS IDENTITY';
              ELSE
                  v_temp = v_temp || ' GENERATED BY DEFAULT AS IDENTITY';
              END IF;
          ELSEIF v_colrec.character_maximum_length IS NOT NULL THEN
              v_temp = v_temp || ('(' || v_colrec.character_maximum_length || ')');
          ELSEIF v_colrec.numeric_precision > 0 AND v_colrec.numeric_scale > 0 THEN
              v_temp = v_temp || '(' || v_colrec.numeric_precision || ',' || v_colrec.numeric_scale || ')';
          END IF;

          -- Handle NULL/NOT NULL
          IF bSerial THEN
              v_temp = v_temp || ' NOT NULL';
          ELSEIF v_colrec.is_nullable = 'NO' THEN
              v_temp = v_temp || ' NOT NULL';
          ELSEIF v_colrec.is_nullable = 'YES' THEN
              v_temp = v_temp || ' NULL';
          END IF;

          -- Handle defaults
          IF v_colrec.column_default IS NOT null AND NOT bSerial THEN
              -- RAISE NOTICE 'Setting default for column, %', v_colrec.column_name;
              v_temp = v_temp || (' DEFAULT ' || v_colrec.column_default);
          END IF;
          v_temp = v_temp || ',' || E'\\n';
          -- RAISE NOTICE 'column def2=%', v_temp;
          v_table_ddl := v_table_ddl || v_temp;
          -- RAISE NOTICE 'tabledef=%', v_table_ddl;

        END LOOP;
      END IF;
      IF bVerbose THEN RAISE NOTICE '(2)tabledef so far: %', v_table_ddl; END IF;

      -- define all the constraints: conparentid does not exist pre PGv11
      IF v_pgversion < 110000 THEN
        FOR v_constraintrec IN
          SELECT con.conname as constraint_name, con.contype as constraint_type,
            CASE
              WHEN con.contype = 'p' THEN 1 -- primary key constraint
              WHEN con.contype = 'u' THEN 2 -- unique constraint
              WHEN con.contype = 'f' THEN 3 -- foreign key constraint
              WHEN con.contype = 'c' THEN 4
              ELSE 5
            END as type_rank,
            pg_get_constraintdef(con.oid) as constraint_definition
          FROM pg_catalog.pg_constraint con JOIN pg_catalog.pg_class rel ON rel.oid = con.conrelid JOIN pg_catalog.pg_namespace nsp ON nsp.oid = connamespace
          WHERE nsp.nspname = in_schema AND rel.relname = in_table ORDER BY type_rank
        LOOP
          v_constraint_name := v_constraintrec.constraint_name;
          v_constraint_def  := v_constraintrec.constraint_definition;
          IF v_constraintrec.type_rank = 1 THEN
              IF pkcnt = 0 OR pktype = 'PKEY_INTERNAL' THEN
                  -- internal def
                  v_constraint_name := v_constraintrec.constraint_name;
                  v_constraint_def  := v_constraintrec.constraint_definition;
                  v_table_ddl := v_table_ddl || '  ' -- note: two char spacer to start, to indent the column
                    || 'CONSTRAINT' || ' '
                    || v_constraint_name || ' '
                    || v_constraint_def
                    || ',' || E'\\n';
              ELSE
                -- Issue#16 handle external PG def
                SELECT 'ALTER TABLE ONLY ' || in_schema || '.' || c.relname || ' ADD CONSTRAINT ' || r.conname || ' ' || pg_catalog.pg_get_constraintdef(r.oid, true) || ';' INTO v_pkey_def
                FROM pg_catalog.pg_constraint r, pg_class c, pg_namespace n where r.conrelid = c.oid and  r.contype = 'p' and n.oid = r.connamespace and n.nspname = in_schema AND c.relname = in_table and r.conname = v_constraint_name;
              END IF;
              IF bPartition THEN
                continue;
              END IF;
          ELSIF v_constraintrec.type_rank = 3 THEN
              -- handle foreign key constraints
              --Issue#22 fix: added FKEY_NONE check
              IF fktype = 'FKEYS_NONE' THEN
                  -- skip
                  continue;
              ELSIF fkcnt = 0 OR fktype = 'FKEYS_INTERNAL' THEN
                  -- internal def
                  v_table_ddl := v_table_ddl || '  ' -- note: two char spacer to start, to indent the column
                    || 'CONSTRAINT' || ' '
                    || v_constraint_name || ' '
                    || v_constraint_def
                    || ',' || E'\\n';
              ELSE
                  -- external def
                  SELECT 'ALTER TABLE ONLY ' || n.nspname || '.' || c2.relname || ' ADD CONSTRAINT ' || r.conname || ' ' || pg_catalog.pg_get_constraintdef(r.oid, true) || ';' INTO v_fkey_def
                  FROM pg_constraint r, pg_class c1, pg_namespace n, pg_class c2 where r.conrelid = c1.oid and  r.contype = 'f' and n.nspname = in_schema and n.oid = r.connamespace and r.conrelid = c2.oid and c2.relname = in_table;
                  v_fkey_defs = v_fkey_defs || v_fkey_def || E'\\n';
              END IF;
          ELSE
              -- handle all other constraints besides PKEY and FKEYS as internal defs by default
              v_table_ddl := v_table_ddl || '  ' -- note: two char spacer to start, to indent the column
                || 'CONSTRAINT' || ' '
                || v_constraint_name || ' '
                || v_constraint_def
                || ',' || E'\\n';
          END IF;
          if bVerbose THEN RAISE NOTICE 'DEBUG4: constraint name=% constraint_def=%', v_constraint_name,v_constraint_def; END IF;
          constraintarr := constraintarr || v_constraintrec.constraint_name:: text;

        END LOOP;
      ELSE
        -- handle PG versions 11 and up
        -- Issue#20: Fix logic for external PKEY and FKEYS
        FOR v_constraintrec IN
          SELECT con.conname as constraint_name, con.contype as constraint_type,
            CASE
              WHEN con.contype = 'p' THEN 1 -- primary key constraint
              WHEN con.contype = 'u' THEN 2 -- unique constraint
              WHEN con.contype = 'f' THEN 3 -- foreign key constraint
              WHEN con.contype = 'c' THEN 4
              ELSE 5
            END as type_rank,
            pg_get_constraintdef(con.oid) as constraint_definition
          FROM pg_catalog.pg_constraint con JOIN pg_catalog.pg_class rel ON rel.oid = con.conrelid JOIN pg_catalog.pg_namespace nsp ON nsp.oid = connamespace
          WHERE nsp.nspname = in_schema AND rel.relname = in_table
                --Issue#13 added this condition:
                AND con.conparentid = 0
                ORDER BY type_rank
        LOOP
          v_constraint_name := v_constraintrec.constraint_name;
          v_constraint_def  := v_constraintrec.constraint_definition;
          IF v_constraintrec.type_rank = 1 THEN
              IF pkcnt = 0 OR pktype = 'PKEY_INTERNAL' THEN
                  -- internal def
                  v_constraint_name := v_constraintrec.constraint_name;
                  v_constraint_def  := v_constraintrec.constraint_definition;
                  v_table_ddl := v_table_ddl || '  ' -- note: two char spacer to start, to indent the column
                    || 'CONSTRAINT' || ' '
                    || v_constraint_name || ' '
                    || v_constraint_def
                    || ',' || E'\\n';
              ELSE
                -- Issue#16 handle external PG def
                SELECT 'ALTER TABLE ONLY ' || in_schema || '.' || c.relname || ' ADD CONSTRAINT ' || r.conname || ' ' || pg_catalog.pg_get_constraintdef(r.oid, true) || ';' INTO v_pkey_def
                FROM pg_catalog.pg_constraint r, pg_class c, pg_namespace n where r.conrelid = c.oid and  r.contype = 'p' and n.oid = r.connamespace and n.nspname = in_schema AND c.relname = in_table;
              END IF;
              IF bPartition THEN
                continue;
              END IF;
          ELSIF v_constraintrec.type_rank = 3 THEN
              -- handle foreign key constraints
              --Issue#22 fix: added FKEY_NONE check
              IF fktype = 'FKEYS_NONE' THEN
                  -- skip
                  continue;
              ELSIF fkcnt = 0 OR fktype = 'FKEYS_INTERNAL' THEN
                  -- internal def
                  v_table_ddl := v_table_ddl || '  ' -- note: two char spacer to start, to indent the column
                    || 'CONSTRAINT' || ' '
                    || v_constraint_name || ' '
                    || v_constraint_def
                    || ',' || E'\\n';
              ELSE
                  -- external def
                  SELECT 'ALTER TABLE ONLY ' || n.nspname || '.' || c2.relname || ' ADD CONSTRAINT ' || r.conname || ' ' || pg_catalog.pg_get_constraintdef(r.oid, true) || ';' INTO v_fkey_def
                  FROM pg_constraint r, pg_class c1, pg_namespace n, pg_class c2 where r.conrelid = c1.oid and  r.contype = 'f' and n.nspname = in_schema and n.oid = r.connamespace and r.conrelid = c2.oid and c2.relname = in_table and
                  r.conname = v_constraint_name and r.conparentid = 0;
                  v_fkey_defs = v_fkey_defs || v_fkey_def || E'\\n';
              END IF;
          ELSE
              -- handle all other constraints besides PKEY and FKEYS as internal defs by default
              v_table_ddl := v_table_ddl || '  ' -- note: two char spacer to start, to indent the column
                || 'CONSTRAINT' || ' '
                || v_constraint_name || ' '
                || v_constraint_def
                || ',' || E'\\n';
          END IF;
          if bVerbose THEN RAISE NOTICE 'DEBUG4: constraint name=% constraint_def=%', v_constraint_name,v_constraint_def; END IF;
          constraintarr := constraintarr || v_constraintrec.constraint_name:: text;

        END LOOP;
      END IF;

      -- drop the last comma before ending the create statement, which should be right before the carriage return character
      -- Issue#24: make sure the comma is there before removing it
      select substring(v_table_ddl, length(v_table_ddl) - 1, 1) INTO v_temp;
      IF v_temp = ',' THEN
          v_table_ddl = substr(v_table_ddl, 0, length(v_table_ddl) - 1) || E'\\n';
      END IF;
      IF bVerbose THEN RAISE NOTICE '(3)tabledef so far: %', trim(v_table_ddl); END IF;

      -- ---------------------------------------------------------------------------
      -- at this point we have everything up to the last table-enclosing parenthesis
      -- ---------------------------------------------------------------------------
      IF bVerbose THEN RAISE NOTICE '(4)tabledef so far: %', v_table_ddl; END IF;

      -- See if this is an inheritance-based child table and finish up the table create.
      IF bPartition and bInheritance THEN
        -- Issue#11: handle parent schema
        -- v_table_ddl := v_table_ddl || ') INHERITS (' || in_schema || '.' || v_parent || ') ' || E'\\n' || v_relopts || ' ' || v_tablespace || ';' || E'\\n';
        IF v_parent_schema = '' OR v_parent_schema IS NULL THEN v_parent_schema = in_schema; END IF;
        v_table_ddl := v_table_ddl || ') INHERITS (' || v_parent_schema || '.' || v_parent || ') ' || E'\\n' || v_relopts || ' ' || v_tablespace || ';' || E'\\n';
      END IF;

      IF v_pgversion >= 100000 AND NOT bPartition and NOT bInheritance THEN
        -- See if this is a partitioned table (pg_class.relkind = 'p') and add the partitioned key
        SELECT pg_get_partkeydef(c1.oid) as partition_key INTO v_partition_key FROM pg_class c1 JOIN pg_namespace n ON (n.oid = c1.relnamespace) LEFT JOIN pg_partitioned_table p ON (c1.oid = p.partrelid)
        WHERE n.nspname = in_schema and n.oid = c1.relnamespace and c1.relname = in_table and c1.relkind = 'p';

        IF v_partition_key IS NOT NULL AND v_partition_key <> '' THEN
          -- add partition clause
          -- NOTE:  cannot specify default tablespace for partitioned relations
          -- v_table_ddl := v_table_ddl || ') PARTITION BY ' || v_partition_key || ' ' || v_tablespace || ';' || E'\\n';
          v_table_ddl := v_table_ddl || ') PARTITION BY ' || v_partition_key || ';' || E'\\n';
        ELSEIF v_relopts <> '' THEN
          v_table_ddl := v_table_ddl || ') ' || v_relopts || ' ' || v_tablespace || ';' || E'\\n';
        ELSE
          -- end the create definition
          v_table_ddl := v_table_ddl || ') ' || v_tablespace || ';' || E'\\n';
        END IF;
      END IF;

      IF bVerbose THEN RAISE NOTICE '(5)tabledef so far: %', v_table_ddl; END IF;

      -- Add closing paren for regular tables
      -- IF NOT bPartition THEN
      -- v_table_ddl := v_table_ddl || ') ' || v_relopts || ' ' || v_tablespace || E';\\n';
      -- END IF;
      -- RAISE NOTICE 'ddlsofar3: %', v_table_ddl;

      -- Issue#16 create the external PKEY def if indicated
      IF v_pkey_def <> '' THEN
          v_table_ddl := v_table_ddl || v_pkey_def || E'\\n';
      END IF;

      -- Issue#20
      IF v_fkey_defs <> '' THEN
            v_table_ddl := v_table_ddl || v_fkey_defs || E'\\n';
      END IF;

      IF bVerbose THEN RAISE NOTICE '(6)tabledef so far: %', v_table_ddl; END IF;

      -- create indexes
      FOR v_indexrec IN
        SELECT indexdef, COALESCE(tablespace, 'pg_default') as tablespace, indexname FROM pg_indexes WHERE (schemaname, tablename) = (in_schema, in_table)
      LOOP
        -- RAISE NOTICE 'DEBUG6: indexname=%  indexdef=%', v_indexrec.indexname, v_indexrec.indexdef;
        -- loop through constraints and skip ones already defined
        bSkip = False;
        FOREACH constraintelement IN ARRAY constraintarr
        LOOP
          IF constraintelement = v_indexrec.indexname THEN
              -- RAISE NOTICE 'DEBUG7: skipping index, %', v_indexrec.indexname;
              bSkip = True;
              EXIT;
          END IF;
        END LOOP;
        if bSkip THEN CONTINUE; END IF;

        -- Add IF NOT EXISTS clause so partition index additions will not be created if declarative partition in effect and index already created on parent
        v_indexrec.indexdef := REPLACE(v_indexrec.indexdef, 'CREATE INDEX', 'CREATE INDEX IF NOT EXISTS');
        -- Fix Issue#26: do it for unique/primary key indexes as well
        v_indexrec.indexdef := REPLACE(v_indexrec.indexdef, 'CREATE UNIQUE INDEX', 'CREATE UNIQUE INDEX IF NOT EXISTS');
        -- RAISE NOTICE 'DEBUG8: adding index, %', v_indexrec.indexname;

        -- NOTE:  cannot specify default tablespace for partitioned relations
        IF v_partition_key IS NOT NULL AND v_partition_key <> '' THEN
            v_table_ddl := v_table_ddl || v_indexrec.indexdef || ';' || E'\\n';
        ELSE
            -- Issue#25: see if partial index or not
            select CASE WHEN i.indpred IS NOT NULL THEN True ELSE False END INTO v_partial
            FROM pg_index i JOIN pg_class c1 ON (i.indexrelid = c1.oid) JOIN pg_class c2 ON (i.indrelid = c2.oid)
            WHERE c1.relnamespace::regnamespace::text = in_schema AND c2.relnamespace::regnamespace::text = in_schema AND c2.relname = in_table AND c1.relname = v_indexrec.indexname;
            IF v_partial THEN
                -- Put tablespace def before WHERE CLAUSE
                v_temp = v_indexrec.indexdef;
                v_pos = POSITION(' WHERE ' IN v_temp);
                v_temp2 = SUBSTRING(v_temp, v_pos);
                v_temp  = SUBSTRING(v_temp, 1, v_pos);
                v_table_ddl := v_table_ddl || v_temp || ' TABLESPACE ' || v_indexrec.tablespace || v_temp2 || ';' || E'\\n';
            ELSE
                v_table_ddl := v_table_ddl || v_indexrec.indexdef || ' TABLESPACE ' || v_indexrec.tablespace || ';' || E'\\n';
            END IF;
        END IF;

      END LOOP;
      IF bVerbose THEN RAISE NOTICE '(7)tabledef so far: %', v_table_ddl; END IF;

      -- Issue#20: added logic for table and column comments
      IF  cmtcnt > 0 THEN
          FOR v_rec IN
            SELECT c.relname, 'COMMENT ON ' || CASE WHEN c.relkind in ('r','p') AND a.attname IS NULL THEN 'TABLE ' WHEN c.relkind in ('r','p') AND a.attname IS NOT NULL THEN 'COLUMN ' WHEN c.relkind = 'f' THEN 'FOREIGN TABLE '
                  WHEN c.relkind = 'm' THEN 'MATERIALIZED VIEW ' WHEN c.relkind = 'v' THEN 'VIEW ' WHEN c.relkind = 'i' THEN 'INDEX ' WHEN c.relkind = 'S' THEN 'SEQUENCE ' ELSE 'XX' END || n.nspname || '.' ||
                  CASE WHEN c.relkind in ('r','p') AND a.attname IS NOT NULL THEN quote_ident(c.relname) || '.' || a.attname ELSE quote_ident(c.relname) END || ' IS '   || quote_literal(d.description) || ';' as ddl
            FROM pg_class c JOIN pg_namespace n ON (n.oid = c.relnamespace) LEFT JOIN pg_description d ON (c.oid = d.objoid) LEFT JOIN pg_attribute a ON (c.oid = a.attrelid AND a.attnum > 0 and a.attnum = d.objsubid)
            WHERE d.description IS NOT NULL AND n.nspname = in_schema AND c.relname = in_table ORDER BY 2 desc, ddl
          LOOP
              --RAISE NOTICE 'comments:%', v_rec.ddl;
              v_table_ddl = v_table_ddl || v_rec.ddl || E'\\n';
          END LOOP;
      END IF;
      IF bVerbose THEN RAISE NOTICE '(8)tabledef so far: %', v_table_ddl; END IF;

      IF trigtype = 'INCLUDE_TRIGGERS' THEN
        -- Issue#14: handle multiple triggers for a table
        FOR v_trigrec IN
            select pg_get_triggerdef(t.oid, True) || ';' as triggerdef FROM pg_trigger t, pg_class c, pg_namespace n
            WHERE n.nspname = in_schema and n.oid = c.relnamespace and c.relname = in_table and c.relkind = 'r' and t.tgrelid = c.oid and NOT t.tgisinternal
        LOOP
            v_table_ddl := v_table_ddl || v_trigrec.triggerdef;
            v_table_ddl := v_table_ddl || E'\\n';
            IF bVerbose THEN RAISE NOTICE 'triggerdef = %', v_trigrec.triggerdef; END IF;
        END LOOP;
      END IF;

      IF bVerbose THEN RAISE NOTICE '(9)tabledef so far: %', v_table_ddl; END IF;
      -- add empty line
      v_table_ddl := v_table_ddl || E'\\n';
      IF bVerbose THEN RAISE NOTICE '(10)tabledef so far: %', v_table_ddl; END IF;

      -- reset search_path back to what it was
      IF search_path_old = '' THEN
        SELECT set_config('search_path', '', false) into v_temp;
      ELSE
        EXECUTE 'SET search_path = ' || search_path_old;
      END IF;

      RETURN v_table_ddl;

      EXCEPTION
      WHEN others THEN
      BEGIN
        GET STACKED DIAGNOSTICS v_diag1 = MESSAGE_TEXT, v_diag2 = PG_EXCEPTION_DETAIL, v_diag3 = PG_EXCEPTION_HINT, v_diag4 = RETURNED_SQLSTATE, v_diag5 = PG_CONTEXT, v_diag6 = PG_EXCEPTION_CONTEXT;
        -- v_ret := 'line=' || v_diag6 || '. '|| v_diag4 || '. ' || v_diag1 || ' .' || v_diag2 || ' .' || v_diag3;
        v_ret := 'line=' || v_diag6 || '. '|| v_diag4 || '. ' || v_diag1;
        RAISE EXCEPTION '%', v_ret;
        -- put additional coding here if necessarY
        RETURN '';
      END;

    END;
  $$;`.trim();e.s(["getTableDefinitionSql",0,({id:e})=>`
    ${C}

    with table_info as (
      select 
        n.nspname::text as schema,
        c.relname::text as name
      from pg_class c
      join pg_namespace n on n.oid = c.relnamespace
      where c.oid = ${e}
    )
    select pg_temp.pg_get_tabledef (
      t.schema,
      t.name,
      false,
      'FKEYS_INTERNAL',
      'INCLUDE_TRIGGERS'
    ) as definition
    from table_info t;
  `.trim()],538892);var z=((t={}).NO_ACTION="a",t.RESTRICT="r",t.CASCADE="c",t.SET_NULL="n",t.SET_DEFAULT="d",t);e.s(["FOREIGN_KEY_CASCADE_ACTION",()=>z,"getAddForeignKeySQL",0,({table:e,foreignKeys:t})=>{let a=t.map(t=>{let{deletionAction:a,updateAction:n}=t,i="c"===a?$.safeSql`ON DELETE CASCADE`:"r"===a?$.safeSql`ON DELETE RESTRICT`:"d"===a?$.safeSql`ON DELETE SET DEFAULT`:"n"===a?$.safeSql`ON DELETE SET NULL`:$.safeSql``,r="c"===n?$.safeSql`ON UPDATE CASCADE`:"r"===n?$.safeSql`ON UPDATE RESTRICT`:$.safeSql``,l=(0,$.joinSqlFragments)(t.columns.map(e=>(0,$.ident)(e.source)),", "),s=(0,$.joinSqlFragments)(t.columns.map(e=>(0,$.ident)(e.target)),", ");return $.safeSql`ALTER TABLE ${(0,$.ident)(e.schema)}.${(0,$.ident)(e.name)} ADD FOREIGN KEY (${l}) REFERENCES ${(0,$.ident)(t.schema)}.${(0,$.ident)(t.table)} (${s}) ${r} ${i}`});return $.safeSql`${(0,$.joinSqlFragments)(a,";\n")};`},"getForeignKeyConstraintsSql",0,({schema:e})=>{if(!e)throw Error("schema is required");return $.safeSql`
SELECT
  con.oid as id,
  con.conname as constraint_name,
  con.confdeltype as deletion_action,
  con.confupdtype as update_action,
  rel.oid as source_id,
  nsp.nspname as source_schema,
  rel.relname as source_table,
  (
    SELECT
      array_agg(
        att.attname
        ORDER BY
          un.ord
      )
    FROM
      unnest(con.conkey) WITH ORDINALITY un (attnum, ord)
      INNER JOIN pg_attribute att ON att.attnum = un.attnum
    WHERE
      att.attrelid = rel.oid
  ) source_columns,
  frel.oid as target_id,
  fnsp.nspname as target_schema,
  frel.relname as target_table,
  (
    SELECT
      array_agg(
        att.attname
        ORDER BY
          un.ord
      )
    FROM
      unnest(con.confkey) WITH ORDINALITY un (attnum, ord)
      INNER JOIN pg_attribute att ON att.attnum = un.attnum
    WHERE
      att.attrelid = frel.oid
  ) target_columns
FROM
  pg_constraint con
  INNER JOIN pg_class rel ON rel.oid = con.conrelid
  INNER JOIN pg_namespace nsp ON nsp.oid = rel.relnamespace
  INNER JOIN pg_class frel ON frel.oid = con.confrelid
  INNER JOIN pg_namespace fnsp ON fnsp.oid = frel.relnamespace
WHERE
  con.contype = 'f'
  AND nsp.nspname = ${(0,$.literal)(e)}
`},"getRemoveForeignKeySQL",0,({table:e,foreignKeys:t})=>{let a=t.map(t=>$.safeSql`ALTER TABLE IF EXISTS ${(0,$.ident)(e.schema)}.${(0,$.ident)(e.name)} DROP CONSTRAINT IF EXISTS ${(0,$.ident)(t.name)}`);return $.safeSql`${(0,$.joinSqlFragments)(a,";\n")};`}],788035);let D={roles:p.default,columns:n.default,schemas:m.default,tables:u,functions:s,tablePrivileges:E.default,publications:_.default,extensions:r.default,config:i.default,materializedViews:c.default,foreignTables:l.default,views:N.default,policies:d.default,triggers:f.default,types:g.default,version:S.default,indexes:o.default,columnPrivileges:a.default,query:I};e.s(["default",0,D],850036)}]);

//# debugId=40203eb0-55dd-fbac-9afd-6f80f8f98634
//# sourceMappingURL=14g8jcjs0_fj_.js.map