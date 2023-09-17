'use client'
import Image from 'next/image'
import { useState } from 'react'


export default function Home() {
  return (
      <div>
        <div className="p-5 flex flex-col border border-4">
          <div className="title">
            <h1>Music Scrapper</h1>
          </div>
          <div>
            <form className='flex flex-col gap-4' action="/result" method="get">
              <input className='p-3 text-black' type="text" name="link" id="" placeholder='https://example.com'/>
              <button type="submit" className='border border-3 rounded-lg'>Start Scrapping</button>
            </form>
          </div>
        </div>
      </div>
  )
}
