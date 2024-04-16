import Category from "@/components/category";
import { TypeButton } from "@/components/type-button";
import { typesResponseSchema } from "@/schemas/types";

const getData = async () => {
  const response = await fetch("https://pokeapi.co/api/v2/type/");

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  const data = await response.json();
  const validation = typesResponseSchema.safeParse(data);
  if (validation.success) {
    return validation.data;
  } else {
    throw new Error("Incorrect data format");
  }
};

export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const typeQueryStr = searchParams.type as string;
  const data = await getData();
  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">Pokemon Master</h1>
      <section>
        <h2 className="text-xl mb-4">Types</h2>
        {data && (
          <div className="grid grid-cols-1 gap-2 md:grid-cols-6">
            {data.results.map((typeData) => (
              <TypeButton
                key={typeData.name}
                type={typeData.name}
                url={typeData.url}
              />
            ))}
          </div>
        )}
      </section>
      {typeQueryStr && (
        <section>
          <Category />
        </section>
      )}
    </div>
  );
}
