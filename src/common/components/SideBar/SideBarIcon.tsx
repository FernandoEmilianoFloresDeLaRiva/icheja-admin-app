interface SideBarIconProps {
  iconName?: string;
  size?: number;
  logoSrc?: string;
  isCollapsed: boolean;
  altText?: string;
}

export default function SideBarIcon({
  iconName,
  size = 100,
  logoSrc,
  isCollapsed,
  altText = "Icon",
}: SideBarIconProps) {
  return (
    <div className="rounded flex items-center justify-center text-xs font-bold">
      <div 
        style={{ 
          width: size, 
          height: size, 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          flexShrink: 0
        }}
      >
        <img
          src={logoSrc}
          alt={altText}
          style={{ 
            width: size, 
            height: size, 
            objectFit: 'contain',
            maxWidth: '100%',
            maxHeight: '100%'
          }}
        />
      </div>
      {!isCollapsed && iconName && iconName.trim() !== "" && (
        <p className="ml-3">{iconName?.toUpperCase()}</p>
      )}
    </div>
  );
}
