declare global {
    interface Window {
      google: typeof google
    }
  }
  
  declare namespace google {
    namespace maps {
      class Map {
        constructor(mapDiv: Element, opts?: MapOptions)
        setCenter(latLng: LatLng | LatLngLiteral): void
        setZoom(zoom: number): void
        setOptions(options: MapOptions): void
        panTo(latLng: LatLng | LatLngLiteral): void
        getBounds(): LatLngBounds
      }
  
      class Marker {
        constructor(opts?: MarkerOptions)
        setMap(map: Map | null): void
        setPosition(latLng: LatLng | LatLngLiteral): void
        getPosition(): LatLng
      }
  
      class LatLng {
        constructor(lat: number, lng: number)
        lat(): number
        lng(): number
      }
  
      class LatLngBounds {
        constructor(sw?: LatLng, ne?: LatLng)
        extend(point: LatLng | LatLngLiteral): LatLngBounds
      }
  
      class Geocoder {
        geocode(request: GeocoderRequest, callback: (results: GeocoderResult[], status: GeocoderStatus) => void): void
      }
  
      interface MapOptions {
        center?: LatLng | LatLngLiteral
        zoom?: number
        mapTypeId?: string
        mapTypeControl?: boolean
        streetViewControl?: boolean
        fullscreenControl?: boolean
        zoomControl?: boolean
      }
  
      interface MarkerOptions {
        position?: LatLng | LatLngLiteral
        map?: Map
        title?: string
        draggable?: boolean
        animation?: Animation
      }
  
      interface LatLngLiteral {
        lat: number
        lng: number
      }
  
      interface GeocoderRequest {
        address?: string
        location?: LatLng | LatLngLiteral
      }
  
      interface GeocoderResult {
        address_components: GeocoderAddressComponent[]
        formatted_address: string
        geometry: {
          location: LatLng
          location_type: string
          viewport: LatLngBounds
        }
        place_id: string
        types: string[]
      }
  
      interface GeocoderAddressComponent {
        long_name: string
        short_name: string
        types: string[]
      }
  
      type GeocoderStatus =
        | "OK"
        | "ZERO_RESULTS"
        | "OVER_QUERY_LIMIT"
        | "REQUEST_DENIED"
        | "INVALID_REQUEST"
        | "UNKNOWN_ERROR"
  
      enum Animation {
        BOUNCE = 1,
        DROP = 2,
      }
  
      namespace event {
        function addListener(instance: any, eventName: string, handler: (...args: any[]) => void): MapsEventListener
      }
  
      interface MapsEventListener {
        remove(): void
      }
  
      namespace places {
        class SearchBox {
          constructor(inputField: HTMLInputElement, opts?: SearchBoxOptions)
          getPlaces(): PlaceResult[]
          setBounds(bounds: LatLngBounds): void
        }
  
        interface SearchBoxOptions {
          bounds?: LatLngBounds
        }
  
        interface PlaceResult {
          address_components?: GeocoderAddressComponent[]
          formatted_address?: string
          geometry?: {
            location: LatLng
            viewport?: LatLngBounds
          }
          name?: string
          place_id?: string
          types?: string[]
        }
      }
    }
  }
  
  // Add this to make the addListener method available on SearchBox
  declare module "google.maps.places" {
    interface SearchBox {
      addListener(eventName: string, handler: Function): google.maps.MapsEventListener
    }
  }
  
  export {}
  