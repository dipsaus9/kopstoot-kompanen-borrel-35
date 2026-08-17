/**
 * Twitter/X (and WhatsApp) share card (BORREL-5.5).
 *
 * Re-exports the opengraph-image route so the summary_large_image preview is
 * pixel-identical to the Open Graph card — one graffiti/anime design, two
 * routes. See app/opengraph-image.tsx for the implementation.
 */

export { default, size, contentType, alt } from "./opengraph-image";
