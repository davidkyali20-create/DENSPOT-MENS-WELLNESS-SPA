/// <reference types="google.maps" />
import {useCallback, useEffect, useState} from 'react';
import {
  APIProvider,
  APILoadingStatus,
  AdvancedMarker,
  InfoWindow,
  Map as GoogleMap,
  Pin,
  useAdvancedMarkerRef,
  useApiLoadingStatus,
  useMap,
  useMapsLibrary,
} from '@vis.gl/react-google-maps';
import {
  Compass,
  ExternalLink,
  Layers,
  MapPin,
  Navigation,
  Phone,
  MessageCircle,
  Car,
  Clock,
} from 'lucide-react';
import {BUSINESS_INFO} from '../data/spaData';

const MAPS_API_KEY = (import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string | undefined) || '';

interface ResolvedPlaceInfo {
  displayName: string;
  formattedAddress: string;
  location: google.maps.LatLngLiteral;
  googleMapsURI: string;
}

const DEFAULT_FALLBACK_MAPS_LINK =
  'https://www.google.com/maps/search/?api=1&query=Greenspot+Towers+Kamakis+Ruiru+Kenya';

function GreenspotMapInner({
  mapTypeId,
  onPlaceResolved,
  onErrorFallback,
}: {
  mapTypeId: 'roadmap' | 'hybrid';
  onPlaceResolved: (info: ResolvedPlaceInfo) => void;
  onErrorFallback: (msg: string) => void;
}) {
  const map = useMap();
  const placesLib = useMapsLibrary('places');
  const loadingStatus = useApiLoadingStatus();
  const [markerRef, marker] = useAdvancedMarkerRef();
  const [placeInfo, setPlaceInfo] = useState<ResolvedPlaceInfo | null>(null);
  const [infoOpen, setInfoOpen] = useState(true);
  const [searching, setSearching] = useState(false);

  useEffect(() => {
    if (
      loadingStatus === APILoadingStatus.AUTH_FAILURE ||
      loadingStatus === APILoadingStatus.FAILED
    ) {
      window.dispatchEvent(new CustomEvent('gmp-quota-exceeded'));
      onErrorFallback('Interactive map could not be loaded. Use the direct directions link below.');
    }
  }, [loadingStatus, onErrorFallback]);

  useEffect(() => {
    if (!placesLib || !map) return;
    let cancelled = false;

    async function locateGreenspot() {
      setSearching(true);
      try {
        const {places} = await placesLib!.Place.searchByText({
          textQuery: 'Greenspot Towers Kamakis Ruiru Kenya',
          fields: ['id', 'displayName', 'formattedAddress', 'location', 'viewport', 'googleMapsURI'],
          region: 'ke',
          language: 'en',
          maxResultCount: 1,
        });

        if (cancelled) return;

        const match = places?.[0];
        if (match?.location) {
          const lat =
            typeof match.location.lat === 'function'
              ? match.location.lat()
              : (match.location.lat as unknown as number);
          const lng =
            typeof match.location.lng === 'function'
              ? match.location.lng()
              : (match.location.lng as unknown as number);

          const resolved: ResolvedPlaceInfo = {
            displayName: match.displayName || 'Greenspot Towers',
            formattedAddress:
              match.formattedAddress || 'Eastern Bypass, Kamakis, Ruiru, Kenya',
            location: {lat, lng},
            googleMapsURI: match.googleMapsURI || DEFAULT_FALLBACK_MAPS_LINK,
          };

          setPlaceInfo(resolved);
          onPlaceResolved(resolved);
          map!.panTo(resolved.location);
          map!.setZoom(16);
        }
      } catch (err) {
        if (cancelled) return;
        const message = err instanceof Error ? err.message : String(err);
        if (
          message.includes('RESOURCE_EXHAUSTED') ||
          message.includes('OVER_QUERY_LIMIT') ||
          message.includes('429')
        ) {
          window.dispatchEvent(new CustomEvent('gmp-quota-exceeded'));
        }
        onErrorFallback('Unable to locate map coordinates right now.');
      } finally {
        if (!cancelled) setSearching(false);
      }
    }

    void locateGreenspot();
    return () => {
      cancelled = true;
    };
  }, [placesLib, map, onPlaceResolved, onErrorFallback]);

  useEffect(() => {
    if (map) {
      map.setMapTypeId(mapTypeId);
    }
  }, [map, mapTypeId]);

  const handleRecenter = useCallback(() => {
    if (map && placeInfo) {
      map.panTo(placeInfo.location);
      map.setZoom(16);
      setInfoOpen(true);
    }
  }, [map, placeInfo]);

  return (
    <>
      {placeInfo && (
        <AdvancedMarker
          ref={markerRef}
          position={placeInfo.location}
          title={`${placeInfo.displayName} — Denspot Room 801`}
          onClick={() => setInfoOpen(true)}
        >
          <Pin
            background="#D4AF37"
            borderColor="#F5F5F7"
            glyphColor="#0B0B0D"
            scale={1.2}
          />
        </AdvancedMarker>
      )}

      {placeInfo && infoOpen && marker && (
        <InfoWindow
          anchor={marker}
          maxWidth={270}
          onCloseClick={() => setInfoOpen(false)}
        >
          <div className="p-1 text-[#16161A] space-y-1.5">
            <p className="font-semibold text-sm text-[#0B0B0D]">
              Denspot Men’s Wellness Spa
            </p>
            <p className="text-xs text-[#3F3F46]">
              {placeInfo.displayName} · 8th Floor, Room 801
            </p>
            <p className="text-xs text-[#52525B]">{placeInfo.formattedAddress}</p>
            <a
              href={placeInfo.googleMapsURI}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs font-semibold text-[#C8102E] hover:underline pt-1"
            >
              Open in Google Maps
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </InfoWindow>
      )}

      {placeInfo && (
        <div className="absolute bottom-3 left-3 z-10 flex items-center gap-2">
          <button
            type="button"
            onClick={handleRecenter}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#0B0B0D]/90 hover:bg-[#16161A] text-[#F5F5F7] border border-[#2C2C34] text-xs font-medium rounded-sm backdrop-blur-sm transition-colors"
          >
            <Compass className="w-3.5 h-3.5 text-[#D4AF37]" />
            Center on Room 801
          </button>
        </div>
      )}

      {searching && (
        <div className="absolute top-3 left-3 z-10 px-3 py-1.5 bg-[#0B0B0D]/85 border border-[#2C2C34] text-xs text-[#F5F5F7] rounded-sm">
          Locating Greenspot Towers…
        </div>
      )}
    </>
  );
}

export function GreenspotLocationSection() {
  const [mapTypeId, setMapTypeId] = useState<'roadmap' | 'hybrid'>('roadmap');
  const [resolvedPlace, setResolvedPlace] = useState<ResolvedPlaceInfo | null>(null);
  const [mapError, setMapError] = useState<string | null>(null);

  const handlePlaceResolved = useCallback((info: ResolvedPlaceInfo) => {
    setResolvedPlace(info);
    setMapError(null);
  }, []);

  const handleErrorFallback = useCallback((msg: string) => {
    setMapError(msg);
  }, []);

  const directionsUrl = resolvedPlace?.googleMapsURI || DEFAULT_FALLBACK_MAPS_LINK;

  return (
    <section
      aria-labelledby="location-heading"
      className="border-t border-[#26262C] bg-[#0B0B0D] py-16 sm:py-20"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          {/* Left Column: Location Details, Parking & One-Tap Actions */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
            <div className="space-y-4">
              <p className="text-xs font-medium tracking-[0.18em] uppercase text-[#D4AF37]">
                Kamakis · Eastern Bypass
              </p>
              <h2
                id="location-heading"
                className="font-display text-3xl sm:text-4xl font-semibold text-[#F5F5F7] text-balance"
              >
                Visit Us at Greenspot Towers
              </h2>
              <p className="text-sm sm:text-base text-[#A1A1AA] leading-relaxed">
                Step away from the Eastern Bypass traffic and take the elevator straight
                to the 8th floor. Room 801 is designed for quiet arrival, private suites,
                and unhurried executive care.
              </p>
            </div>

            <div className="space-y-5 border-t border-[#26262C] pt-6 text-sm">
              <div className="flex items-start gap-3.5">
                <MapPin className="w-4 h-4 text-[#D4AF37] shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-[#F5F5F7]">
                    {resolvedPlace?.displayName || BUSINESS_INFO.building} ·{' '}
                    {BUSINESS_INFO.floorSuite}
                  </p>
                  <p className="text-[#A1A1AA] mt-0.5">
                    {resolvedPlace?.formattedAddress || BUSINESS_INFO.streetArea}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <Car className="w-4 h-4 text-[#D4AF37] shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-[#F5F5F7]">Secure On-Site Parking</p>
                  <p className="text-[#A1A1AA] mt-0.5">{BUSINESS_INFO.parking}</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <Clock className="w-4 h-4 text-[#D4AF37] shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-[#F5F5F7]">Operating Hours</p>
                  <p className="text-[#A1A1AA] mt-0.5 tabular-nums">
                    {BUSINESS_INFO.hoursWeekday}
                    <br />
                    {BUSINESS_INFO.hoursSunday}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href={`tel:+${BUSINESS_INFO.phoneRaw}`}
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#16161A] hover:bg-[#1E1E24] border border-[#2C2C34] hover:border-[#D4AF37] text-[#F5F5F7] text-sm font-medium rounded-sm transition-colors whitespace-nowrap"
              >
                <Phone className="w-4 h-4 text-[#D4AF37]" />
                Call {BUSINESS_INFO.phoneDisplay}
              </a>

              <a
                href={`https://wa.me/${BUSINESS_INFO.phoneRaw}?text=${encodeURIComponent(
                  'Hello Denspot Room 801, I am heading to Greenspot Towers and would like to check slot availability.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#152219] hover:bg-[#1C2F22] border border-[#2C4734] text-[#E1F3E6] text-sm font-medium rounded-sm transition-colors whitespace-nowrap"
              >
                <MessageCircle className="w-4 h-4 text-[#6BC184]" />
                WhatsApp Front Desk
              </a>

              <a
                href={directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-[#D4AF37] hover:text-[#E5C65C] text-sm font-medium underline underline-offset-4 whitespace-nowrap"
              >
                <Navigation className="w-4 h-4" />
                Get Directions
              </a>
            </div>
          </div>

          {/* Right Column: Interactive Google Map */}
          <div className="lg:col-span-7 flex flex-col">
            <div className="flex items-center justify-between gap-4 mb-3">
              <p className="text-xs text-[#A1A1AA]">
                Interactive Map · Greenspot Towers, Kamakis
              </p>
              <div className="inline-flex items-center p-0.5 bg-[#16161A] border border-[#26262C] rounded-sm">
                <button
                  type="button"
                  onClick={() => setMapTypeId('roadmap')}
                  className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-sm transition-colors ${
                    mapTypeId === 'roadmap'
                      ? 'bg-[#D4AF37] text-[#0B0B0D]'
                      : 'text-[#A1A1AA] hover:text-[#F5F5F7]'
                  }`}
                >
                  <Layers className="w-3 h-3" />
                  Map
                </button>
                <button
                  type="button"
                  onClick={() => setMapTypeId('hybrid')}
                  className={`px-3 py-1 text-xs font-medium rounded-sm transition-colors ${
                    mapTypeId === 'hybrid'
                      ? 'bg-[#D4AF37] text-[#0B0B0D]'
                      : 'text-[#A1A1AA] hover:text-[#F5F5F7]'
                  }`}
                >
                  Satellite
                </button>
              </div>
            </div>

            <div className="relative w-full h-[380px] lg:h-[440px] rounded-sm overflow-hidden border border-[#26262C] bg-[#16161A]">
              {MAPS_API_KEY && !mapError ? (
                <APIProvider
                  apiKey={MAPS_API_KEY}
                  libraries={['places', 'marker']}
                  language="en"
                  region="KE"
                >
                  <GoogleMap
                    mapId="DEMO_MAP_ID"
                    defaultCenter={{lat: -1.28, lng: 36.82}}
                    defaultZoom={11}
                    gestureHandling="cooperative"
                    mapTypeControl={false}
                    streetViewControl={false}
                    internalUsageAttributionIds={['gmp_mcp_codeassist_v1_aistudio']}
                    style={{width: '100%', height: '100%'}}
                  >
                    <GreenspotMapInner
                      mapTypeId={mapTypeId}
                      onPlaceResolved={handlePlaceResolved}
                      onErrorFallback={handleErrorFallback}
                    />
                  </GoogleMap>
                </APIProvider>
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center bg-gradient-to-br from-[#16161A] to-[#0B0B0D]">
                  <MapPin className="w-8 h-8 text-[#D4AF37] mb-3" />
                  <h3 className="font-display text-2xl text-[#F5F5F7]">
                    Greenspot Towers · 8th Floor, Room 801
                  </h3>
                  <p className="text-sm text-[#A1A1AA] mt-2 max-w-md">
                    {mapError ||
                      'Located directly along the Eastern Bypass in Kamakis, Ruiru with secure basement and ground-level parking.'}
                  </p>
                  <a
                    href={directionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 inline-flex items-center gap-2 px-5 py-2.5 bg-[#D4AF37] hover:bg-[#E2C04D] text-[#0B0B0D] text-sm font-semibold rounded-sm transition-colors"
                  >
                    Open Greenspot Towers in Google Maps
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
