import React, { useState, useEffect } from 'react';
import EnturService, { convertFeatureToLocation } from '@entur/sdk'

const service = new EnturService({ clientName: 'Oslomet-s331044_MAUU5010_project' })

function DeparturesDisplay(setFrom, setTo) {
    async function fetchDepartures() {
        const [fromFeature] = await service.getFeatures('Ryllikvegen, Lillehammer')
        const [toFeature] = await service.getFeatures('Oslo S')

        if (!fromFeature || !toFeature) {
            return
        }

        const tripPatterns = await service.getTripPatterns({
            modes: ['foot'],
            searchDate: new Date(),
            from: convertFeatureToLocation(fromFeature),
            to: convertFeatureToLocation(toFeature),
        })

        console.log(tripPatterns)
        tripPatterns.filter(trip => trip.legs.map(leg => leg.mode !== 'rails'));
    }
}

export default DeparturesDisplay;