import React from 'react'
import { Header } from '~/components'

const AITrips = () => {
  return (
      <main className="all-users wrapper">
      <Header
        title="Trips"
        description="View and generate AI travel plans"
        size="small"
        ctaText='Create a Trip'
        ctaUrl='/trips/create'
      />

     
      </main>
  )
}

export default AITrips
