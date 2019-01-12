window.jazzy = { docset: false }
if (typeof window.dash !== 'undefined') {
  document.documentElement.className += ' dash'
  window.jazzy.docset = true
}
if (navigator.userAgent.match(/xcode/i)) {
  document.documentElement.className += ' xcode'
  window.jazzy.docset = true
}

// On doc load, toggle the URL hash discussion if present
$(document).ready(() => {
  if (!window.jazzy.docset) {
    const linkToHash = $(`a[href="${window.location.hash}"]`)
    linkToHash.trigger('click')
  }
})

// On token click, toggle its discussion and animate token.marginLeft
$('.token').click(function (event) {
  if (window.jazzy.docset) {
    return
  }
  const link = $(this)
  const animationDuration = 300
  const tokenOffset = '15px'
  const original = link.css('marginLeft') == tokenOffset
  link.animate({ 'margin-left': original ? '0px' : tokenOffset }, animationDuration)
  $content = link.parent().parent().next()
  $content.slideToggle(animationDuration)

  // Keeps the document from jumping to the hash.
  const href = $(this).attr('href')
  if (history.pushState) {
    history.pushState({}, '', href)
  } else {
    location.hash = href
  }
  event.preventDefault()
})
