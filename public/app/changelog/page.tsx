import InformativeSection from "@/components/sections/InformativeSection";

interface GeodeModPayload {
  changelog: string;
  download_count: number;
  updated_at: string;
  versions: { version: string }[];
}

interface GeodeModResponse {
  payload: GeodeModPayload;
}

async function getModData(modId: string): Promise<GeodeModResponse> {
  const res = await fetch(
    `https://api.geode-sdk.org/v1/mods/${modId}`,
    { next: { revalidate: 3600 } }
  );
  if (!res.ok) throw new Error(`Failed to fetch mod data for ${modId}`);
  return res.json();
}

function buildStats(payload: GeodeModPayload) {
  return [
    { icon: "solar:tag-linear", value: `v${payload.versions[0]?.version ?? "unknown"}` },
    {
      icon: "solar:download-minimalistic-linear",
      value: payload.download_count.toLocaleString() + " downloads",
    },
  ];
}

export default async function ChangelogPage() {
  const [collabData, collabUiData] = await Promise.all([
    getModData("alk.editor-collab"),
    getModData("alk.editor-collab-ui"),
  ]);

  // Use the most recently updated mod's date for the "Last updated" header
  const updatedDate = new Date(
    Math.max(
      new Date(collabData.payload.updated_at).getTime(),
      new Date(collabUiData.payload.updated_at).getTime()
    )
  ).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <main>
      <InformativeSection
        title="Changelog"
        updatedAt={updatedDate}
        backHref="/"
        backLabel="Back to Home"
        tabs={[
          {
            label: "Editor Collab",
            icon: "/assets/Normal.svg",
            content: collabData.payload.changelog,
            stats: buildStats(collabData.payload),
          },
          {
            label: "Editor Collab UI",
            icon: "/assets/UI.svg",
            content: collabUiData.payload.changelog,
            stats: buildStats(collabUiData.payload),
          },
        ]}
        content=""
      />
    </main>
  );
}
