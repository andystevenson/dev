console.log('My CMS', window.CMS, window.netlifyIdentity)

const CMS = window.CMS

CMS.registerEventListener({
  name: 'prePublish',
  handler: ({ author, entry }) => {
    console.log('my prePublish', { author, entry })
    console.log(JSON.stringify({ author, data: entry.get('data') }, null, 2))
  },
})

// CMS.registerEventListener({
//   name: 'postPublish',
//   handler: ({ author, entry }) => {
//     console.log('my postPublish', { author, entry })
//     console.log(JSON.stringify({ author, data: entry.get('data') }, null, 2))
//   },
// })

// CMS.registerEventListener({
//   name: 'preUnpublish',
//   handler: ({ author, entry }) => {
//     console.log('my preUnpublish', { author, entry })
//   },
// })

// CMS.registerEventListener({
//   name: 'postUnpublish',
//   handler: ({ author, entry }) => {
//     console.log('my postUnpublish', { author, entry })
//   },
// })

CMS.registerEventListener({
  name: 'preSave',
  handler: ({ author, entry }) => {
    console.log('preSave', { author, entry })
    console.log(JSON.stringify({ author, data: entry.get('data') }, null, 2))

    entry.get('data').set('permalink', false)
    entry.get('data').set('author', author)
    entry.get('data').set('date', new Date().toUTCString())
    console.log(
      'after change>>>>2',
      JSON.stringify({ author, data: entry.get('data') }, null, 2),
    )
  },
})

CMS.registerEventListener({
  name: 'postSave',
  handler: ({ author, entry }) => {
    console.log('postSave', { author, entry })
    console.log(JSON.stringify({ author, data: entry.get('data') }, null, 2))
  },
})
