import { google } from 'googleapis'
import { NextResponse } from 'next/server'

// Initialize Google Sheets API
const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY?.split(String.raw`\n`).join('\n'),
  },
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
})

const sheets = google.sheets({ version: 'v4', auth })

export async function POST(request) {
  try {
    // Check if credentials are set
    if (!process.env.GOOGLE_CLIENT_EMAIL || !process.env.GOOGLE_PRIVATE_KEY || !process.env.GOOGLE_SHEET_ID) {
      console.error('Missing Google Sheets credentials:', {
        hasClientEmail: !!process.env.GOOGLE_CLIENT_EMAIL,
        hasPrivateKey: !!process.env.GOOGLE_PRIVATE_KEY,
        hasSheetId: !!process.env.GOOGLE_SHEET_ID,
      })
      return NextResponse.json(
        { error: 'Server configuration error: Missing Google Sheets credentials' },
        { status: 500 }
      )
    }

    const body = await request.json()
    const { name, message } = body

    // Validate required fields
    if (!name  || !message) {
      return NextResponse.json(
        { error: 'Semua field harus diisi' },
        { status: 400 }
      )
    }

    // Prepare the row data
    const row = [
      new Date().toISOString(), // Timestamp
      name,
      message,
    ]

    try {
      // First, verify the spreadsheet exists and we have access
      try {
        await sheets.spreadsheets.get({
          spreadsheetId: process.env.GOOGLE_SHEET_ID,
        })
      } catch (error) {
        console.error('Error accessing spreadsheet:', {
          message: error.message,
          code: error.code,
          status: error.status,
        })
        return NextResponse.json(
          { 
            error: 'Tidak dapat mengakses spreadsheet',
            details: 'Pastikan ID spreadsheet benar dan service account memiliki akses'
          },
          { status: 500 }
        )
      }

      // Log the request details (without sensitive data)
      console.log('Attempting to append to sheet:', {
        sheetId: process.env.GOOGLE_SHEET_ID,
        range: 'Feedback!A:F',
        rowCount: row.length,
      })

      // Append the row to the spreadsheet
      const response = await sheets.spreadsheets.values.append({
        spreadsheetId: process.env.GOOGLE_SHEET_ID,
        range: 'Feedback!A:F',
        valueInputOption: 'USER_ENTERED',
        requestBody: {
          values: [row],
        },
      })

      console.log('Successfully appended to sheet:', {
        updatedRange: response.data.updates?.updatedRange,
        updatedRows: response.data.updates?.updatedRows,
      })

      return NextResponse.json(
        { message: 'Feedback berhasil dikirim' },
        { status: 200 }
      )
    } catch (sheetsError) {
      console.error('Google Sheets API Error:', {
        message: sheetsError.message,
        code: sheetsError.code,
        status: sheetsError.status,
        errors: sheetsError.errors,
      })
      
      return NextResponse.json(
        { 
          error: 'Gagal menyimpan feedback ke spreadsheet',
          details: sheetsError.message
        },
        { status: 500 }
      )
    }
  } catch (error) {
    console.error('Error submitting feedback:', {
      message: error.message,
      stack: error.stack,
    })
    
    return NextResponse.json(
      { 
        error: 'Terjadi kesalahan saat mengirim feedback',
        details: error.message
      },
      { status: 500 }
    )
  }
} 