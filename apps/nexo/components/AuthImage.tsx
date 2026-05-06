import Image from 'next/image'

interface AuthImageProps {
  src?: string
  alt?: string
  position?: 'left' | 'right'
}

export function AuthImage({
  src = '/login-bg.png',
  alt = 'Nexo background',
  position = 'left'
}: AuthImageProps) {
  return (
    <div className={`
      absolute inset-y-0 w-full md:w-2/5
      hidden md:block overflow-hidden
      ${position === 'right' ? 'right-0' : 'left-0'}
    `}>
      <div className="relative w-full h-full">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover object-center"
          priority
        />
      </div>
    </div>
  )
}