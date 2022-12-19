exports.respondHeaders = {
    Connection: 'keep - alive',
    'Access-Control-Allow-Origin': 'http://pizzeria.skillbox.cc',
    'Access-Control-Allow-Credentials': true,
    'X-Content-Type-Options': 'nosniff',
    'X-Robots-Tag': 'noindex',
    'Cache-Control': 'no-cache, must-revalidate, max-age=0',
    'Set-Cookie': 'woocommerce_cart_hash=80a0b263282bc6e10a6f19e81498b898; path=/',
    'Content-Encoding': 'gzip',
}

exports.respondData = `<ul class="woocommerce-error" role="alert">\n\t\t\t<li>\n\t\t\tServer isn't responded\t\t</li>\n\t</ul>`