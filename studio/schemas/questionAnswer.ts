import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'questionAnswer',
  title: 'Question/Answer',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      validation: (Rule) => Rule.required(),
      options: {
        source: 'title',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'question',
      title: 'Question',
      type: 'blockContent',
    }),
    defineField({
      name: 'answer',
      title: 'Answer',
      type: 'blockContent',
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'topic',
      title: 'Topic',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'topic'}]}],
      validation: (Rule) => Rule.required(),
      options: {
        sortable: false,
      },
      // to: [{type: 'topic'}],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'mainImage',
    },
    prepare(selection) {
      const {author} = selection
      return {...selection, subtitle: author && `by ${author}`}
    },
  },
})
