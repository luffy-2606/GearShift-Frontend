import { StructureBuilder } from 'sanity/structure'

export const structure = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Site Settings')
        .id('siteSettings')
        .child(
          S.document()
            .schemaType('siteSettings')
            .documentId('siteSettings')
        ),
      S.listItem()
        .title('Landing Page')
        .id('landingPage')
        .child(
          S.document()
            .schemaType('landingPage')
            .documentId('landingPage')
        ),
      S.divider(),
      S.documentTypeListItem('pageConfig').title('Page Configs'),
    ])
