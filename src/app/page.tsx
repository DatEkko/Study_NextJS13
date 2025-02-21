import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Homepage',
  description: 'Generated by create next app',
}

export default function Home() {
  return (
    <div className="container mt-4">
      <div style={{
        textAlign: "center",
        fontSize: "2em",
        fontWeight: "600",
      }}>
        Blogs Social Network
      </div>
    </div>
  )
}
