import type { PetImage } from "@/data/pets-arthritis.generated";

export default function PetPhotoCredits({ images }: { images: PetImage[] }) {
  const unique = [...new Map(images.map(image => [image.url, image])).values()];
  return (
    <section className="mt-8 border-t pt-4 text-sm text-gray-600" aria-label="Photo sources">
      <p>Illustrative animal photographs, not clinical records. The animals pictured are not identified as having arthritis.</p>
      <ul className="mt-2 space-y-2">
        {unique.map(image => (
          <li key={image.url}>
            <a className="underline" href={image.source}>{image.title}</a>. Photo: {image.credit}. {" "}
            <a className="underline" href={image.licenseUrl}>{image.license}</a>. {image.changes}.
          </li>
        ))}
      </ul>
    </section>
  );
}
