import Footer from "../components/home/footer";
import Nav from "../components/home/nav";
import How from "../components/how";
export default function Home() {
  return (
    <div>
      <Nav />
      <main className="mb-16 md:mb-32 mt-32 md:mt-52 px-10 lg:px-36">
        <How />
      </main>
      <Footer />
    </div>
  );
}
