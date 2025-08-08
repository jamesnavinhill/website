import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/typography";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <header className="container mx-auto px-4 py-16 sm:py-24">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <Typography variant="h1" className="text-foreground">
            Welcome to My Digital Universe
          </Typography>

          <Typography
            variant="body"
            className="text-xl text-muted-foreground max-w-2xl mx-auto"
          >
            A journey through space, code, creativity, and everything in
            between. This is where ideas take flight and digital dreams come to
            life.
          </Typography>

          <div className="flex gap-4 justify-center flex-wrap">
            <Button variant="primary" size="lg">
              Begin the Journey
            </Button>
            <Button variant="outline" size="lg">
              Explore Components
            </Button>
          </div>
        </div>
      </header>

      {/* Content Preview Section */}
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <Typography variant="h2" className="text-foreground mb-4">
              The Journey Ahead
            </Typography>
            <Typography
              variant="body"
              className="text-muted-foreground max-w-2xl mx-auto"
            >
              From the vastness of space to the depths of creativity, explore
              the different facets of this digital experience.
            </Typography>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Developer",
                description: "Code, projects, and technical explorations",
                status: "Coming Soon",
              },
              {
                title: "Artist",
                description: "Music, design, and creative expressions",
                status: "Coming Soon",
              },
              {
                title: "Thinker",
                description: "Ideas, research, and thoughtful content",
                status: "Coming Soon",
              },
              {
                title: "Gamer",
                description: "Gaming experiences and development",
                status: "Coming Soon",
              },
              {
                title: "Professional",
                description: "Work history and achievements",
                status: "Coming Soon",
              },
              {
                title: "Community",
                description: "Connections and shared experiences",
                status: "Coming Soon",
              },
            ].map((section, index) => (
              <div
                key={index}
                className="border border-border rounded-lg p-6 bg-card"
              >
                <Typography variant="h4" className="text-card-foreground mb-2">
                  {section.title}
                </Typography>
                <Typography
                  variant="body"
                  className="text-muted-foreground mb-4"
                >
                  {section.description}
                </Typography>
                <Typography variant="caption" className="text-muted-foreground">
                  {section.status}
                </Typography>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-muted/50">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <Typography variant="caption" className="text-muted-foreground">
              Built with Next.js, Tailwind CSS, and Storybook •{" "}
              {new Date().getFullYear()}
            </Typography>
          </div>
        </div>
      </footer>
    </div>
  );
}
