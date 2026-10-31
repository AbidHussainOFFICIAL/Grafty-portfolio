import { clients } from "@/data/content";
import { clientLogoArt } from "@/data/artwork";
import { VectorArt } from "@/components/ui/VectorArt";
import { VelocityMarquee } from "@/components/ui/VelocityMarquee";

/** Width of a logo tile in the design, in the same units as the traced artwork. */
const TILE_WIDTH = 177;

function LogoTile({ id, className }: { id: (typeof clients)[number]["id"]; className: string }) {
  const art = clientLogoArt[id];
  return (
    <div className={`grid place-items-center rounded-xl bg-white lg:rounded-[1.2cqw] ${className}`}>
      {/* Keeps each logo at the same proportion of its tile as in the design. */}
      <div style={{ width: `${(art.width / TILE_WIDTH) * 100}%` }}>
        <VectorArt art={art} className="block h-auto w-full text-ink" />
      </div>
    </div>
  );
}

export function Clients() {
  const clientNames = clients.map((client) => client.name).join(", ");

  return (
    <section
      id="clients"
      aria-labelledby="clients-title"
      className="mt-20 px-5 md:mt-28 md:px-8 lg:mt-[12.6cqw] lg:px-[5.08%]"
    >
      <div className="font-cond flex items-baseline justify-between text-xs uppercase lg:text-[max(13px,1.3cqw)]">
        <h2 id="clients-title">Some of my clients</h2>
        <span>100+ Client</span>
      </div>

      <p className="sr-only">Clients include {clientNames}.</p>

      {/* Tablet and up: five tiles in a row */}
      <ul
        aria-hidden="true"
        className="mt-3 hidden grid-cols-5 gap-2 md:grid lg:mt-[1.9cqw] lg:gap-[0.8cqw]"
      >
        {clients.map((client) => (
          <li key={client.id}>
            <LogoTile id={client.id} className="aspect-[177/161]" />
          </li>
        ))}
      </ul>

      {/* Phones: an endless strip that speeds up while scrolling */}
      <div aria-hidden="true" className="md:hidden">
        <VelocityMarquee className="mt-3">
          {clients.map((client) => (
            <LogoTile key={client.id} id={client.id} className="h-32 w-36 shrink-0" />
          ))}
        </VelocityMarquee>
      </div>
    </section>
  );
}
