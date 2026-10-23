import { GlobalConfig } from 'payload'

export const AnnouncementBanner: GlobalConfig = {
  slug: 'announcement-banner',
  label: 'Announcement Banner',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'enabled',
      type: 'checkbox',
      label: 'Enable Banner on Site',
      defaultValue: false,
    },
    {
      name: 'activeAnnouncementIndex',
      type: 'number',
      label: 'Active Announcement Row Number',
      defaultValue: 1,
      admin: {
        description:
          'Specify which row number from the list below to show on the live site (e.g., enter 1 for the 1st row).',
        condition: (_, siblingData) => Boolean(siblingData?.enabled),
      },
    },
    {
      name: 'announcements',
      type: 'array',
      label: 'Saved Announcements Library',
      minRows: 1,
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Internal Reference Name (e.g., Buyback Special, Holiday Hours)',
          required: true,
        },
        {
          name: 'text',
          type: 'text',
          label: 'Banner Display Text',
          required: true,
        },
        {
          name: 'linkText',
          type: 'text',
          label: 'Link Text (Optional)',
        },
        {
          name: 'linkUrl',
          type: 'text',
          label: 'Link Target URL (Optional)',
        },
      ],
    },
  ],
}
