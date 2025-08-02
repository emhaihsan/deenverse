import Image from "next/image";

type Organization = {
  id: string;
  name: string;
  logo: string;
};

type OrganizationSelectionProps = {
  organizations: Organization[];
  selectedOrg: string;
  onSelectOrg: (id: string) => void;
  theme: {
    icon: React.ReactNode;
    title: string;
    selectedClass: string;
    hoverClass: string;
  };
};

export default function OrganizationSelection({
  organizations,
  selectedOrg,
  onSelectOrg,
  theme,
}: OrganizationSelectionProps) {
  return (
    <div className="bg-white rounded-2xl border-b-4 border-gray-900 p-6">
      <div className="flex items-center gap-3 mb-4">
        {theme.icon}
        <h2 className="text-xl font-medium text-gray-900">{theme.title}</h2>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {organizations.map((org) => (
          <div
            key={org.id}
            className={`border-2 rounded-lg p-4 cursor-pointer transition-all duration-300 flex flex-col items-center justify-center text-center ${
              selectedOrg === org.id
                ? theme.selectedClass
                : `border-gray-200 ${theme.hoverClass} hover:shadow-md`
            }`}
            onClick={() => onSelectOrg(org.id)}
          >
            <div className="relative h-16 w-full mb-2">
              <Image
                src={org.logo}
                alt={org.name}
                fill
                className="object-contain"
              />
            </div>
            <p className="text-sm font-medium mt-2 text-gray-800">{org.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
