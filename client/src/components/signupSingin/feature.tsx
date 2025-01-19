const Feature = (
  { icon: Icon, title, description }: {
    icon: any;
    title: string;
    description: string;
  },
) => (
  <div className="flex items-start gap-4 rounded-lg bg-[#0A101F]/40 p-4 transition-all duration-300 hover:bg-[#0A101F]/60">
    <div className="rounded-lg bg-blue-500/10 p-2">
      <Icon className="h-5 w-5 text-blue-400" />
    </div>
    <div>
      <h3 className="font-medium text-gray-100">{title}</h3>
      <p className="mt-1 text-sm text-gray-400">{description}</p>
    </div>
  </div>
);

export default Feature;
