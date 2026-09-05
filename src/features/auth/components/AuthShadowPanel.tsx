import Image from "next/image";

export interface AuthShadowPanelProps {
    title: string;
    description: string;
    imageSrc?: string;
    logoSrc?: string;
    imageAlt?: string;
    logoAlt?: string;
}

export default function AuthShadowPanel({
    title,
    description,
    imageSrc = "/images/auth_img.webp",
    logoSrc = "/images/website_logo.webp",
    imageAlt = "Auth background",
    logoAlt = "Website logo",
}: AuthShadowPanelProps) {
    return (
        <section className="relative isolate flex min-h-[320px] w-full overflow-hidden sm:min-h-[400px] lg:h-full lg:min-h-[600px]">
            {/* Background Image */}
            <Image
                src={imageSrc}
                alt={imageAlt}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
            />

            {/* Dark / Blue Overlay */}
            <div className="absolute inset-0 bg-[rgba(28,72,110,0.68)] backdrop-blur-[1px]" />

            {/* Content */}
            <div className="relative z-10 flex w-full flex-1 items-center justify-center px-6 py-10 sm:px-10 sm:py-12 lg:px-12 xl:px-16">
                <div className="flex w-full max-w-md flex-col items-center justify-center text-center">
                    {/* Logo */}
                    <div className="relative mb-5  sm:mb-6">
                        <Image
                            src={logoSrc}
                            alt={logoAlt}
                            height={900}
                            width={900}
                            priority
                            className="w-full object-contain"
                        />
                    </div>

                    {/* Text */}
                    <div className="flex flex-col items-center gap-2 sm:gap-3">
                        <h3 className="text-[clamp(22px,3vw,32px)] font-semibold leading-tight text-white">
                            {title}
                        </h3>

                        <p className="max-w-[25.0rem] text-[clamp(1rem,1.2vw,1.25rem)] font-normal leading-relaxed text-white/90">
                            {description}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}