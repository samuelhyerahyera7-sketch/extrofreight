import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const TO_EMAIL = 'admin@extrofreight.co.za'
const SITE_URL = 'https://www.extrofreight.co.za'
const LOGO_HEADER = `
  <div style="padding:20px 0;text-align:left">
    <img src="${SITE_URL}/images/logo-wordmark.png" alt="Extrofreight" height="28" style="height:28px;width:auto;display:inline-block" />
  </div>
`

function esc(s: string) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

export async function POST(req: Request) {
  const body = await req.json()
  const {
    moveType, isBoxShop, size, itemSummary, boxSummary, itemsOther,
    fromAddress, toAddress, dateMode, date, notes, name, phone, email, boxTotal,
  } = body

  const td = 'style="border:1px solid #eee;padding:6px 10px"'
  const row = (label: string, value: string) => `<tr><td ${td}><strong>${esc(label)}</strong></td><td ${td}>${esc(value)}</td></tr>`

  const rows: string[] = []
  rows.push(row('Request type', isBoxShop ? 'Box Shop order' : 'Quote request'))
  rows.push(row('Move type', moveType || '—'))
  if (size) rows.push(row('Size', size))
  if (itemSummary?.length) rows.push(row('Items', itemSummary.join(', ')))
  if (itemsOther) rows.push(row('Other items', itemsOther))
  if (boxSummary?.length) rows.push(row('Box shop order', boxSummary.join(', ')))
  if (boxTotal) rows.push(row('Estimated total', `R${boxTotal}`))
  if (fromAddress) rows.push(row('Moving from', fromAddress))
  if (toAddress) rows.push(row(isBoxShop ? 'Delivery address' : 'Moving to', toAddress))
  rows.push(row('Date', dateMode === 'flexible' ? 'Flexible' : (date || '—')))
  if (notes) rows.push(row('Notes', notes))
  rows.push(row('Name', name))
  rows.push(row('Phone', phone))
  rows.push(row('Email', email))

  const html = `
    ${LOGO_HEADER}
    <h2>${isBoxShop ? 'New Box Shop order' : 'New quote request'} — Extrofreight</h2>
    <table cellpadding="0" cellspacing="0" style="border-collapse:collapse">${rows.join('')}</table>
  `

  const firstName = (name || '').split(' ')[0] || 'there'
  const customerHtml = `
    ${LOGO_HEADER}
    <h2>Thanks, ${esc(firstName)} — we've got your ${isBoxShop ? 'order' : 'quote'} request</h2>
    <p>A move coordinator will be in touch within one business day${isBoxShop ? ' to confirm stock and delivery cost' : ' with a written quote'}.</p>
    <p>Here's a copy of what you sent us:</p>
    <table cellpadding="0" cellspacing="0" style="border-collapse:collapse">${rows.join('')}</table>
    <p style="margin-top:16px">Need to reach us sooner? Call <a href="tel:+27813756494">081 375 6494</a> or reply to this email.</p>
    <p>— The Extrofreight team</p>
  `

  try {
    const resend = new Resend(process.env.RESEND_API_KEY)
    const { error } = await resend.emails.send({
      from: 'Extrofreight Website <quotes@extrofreight.co.za>',
      to: TO_EMAIL,
      replyTo: email,
      subject: `${isBoxShop ? 'Box Shop order' : 'Quote request'} from ${name}`,
      html,
    })
    if (error) {
      console.error('Resend rejected quote email', error)
      return NextResponse.json({ ok: false }, { status: 502 })
    }

    if (email) {
      const { error: customerError } = await resend.emails.send({
        from: 'Extrofreight <quotes@extrofreight.co.za>',
        to: email,
        replyTo: TO_EMAIL,
        subject: `We've received your ${isBoxShop ? 'order' : 'quote'} request — Extrofreight`,
        html: customerHtml,
      })
      if (customerError) {
        console.error('Failed to send customer confirmation email', customerError)
      }
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Failed to send quote email', err)
    return NextResponse.json({ ok: false }, { status: 500 })
  }
}
