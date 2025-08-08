import Head from "next/head";
import { gql, useQuery } from "@apollo/client";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from '../context/LanguageContext';

const GET_BRANDS = gql`
  query GetBrands {
    findAllBrands { id name image }
  }
`;

// Footer Component
const Footer = () => {
  const { language, setLanguage, t } = useLanguage();
  return (
    <footer className="mt-auto bg-gray-100 text-gray pt-20 pb-16">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
        <div className="col-span-2 md:col-span-1">
          <div className="flex items-center mb-4">
            <Image src="/Butterfly.svg" alt="VibeStrings Logo" width={32} height={32} className="mr-2" />
            <span className="text-3xl font-bold">VibeStrings</span>
          </div>
          <div className="flex items-center text-gray-400 mb-2">
            <span className="mr-2"><Image src="/sms.png" width={20} height={20} alt="Email icon"/></span>
            <a href="mailto:brikendazogajj@gmail.com">{t('footerEnquiry')}</a>
          </div>
          <div className="flex items-center text-gray-400">
            <span className="mr-2"><Image src="/location.png" width={20} height={20} alt="Location icon"/></span>
            <a href="https://www.google.com/maps/place/Pristina,+Kosovo">{t('footerLocation')}</a>
          </div>
        </div>
        <div>
          <h4 className="font-semibold mb-3">{t('footerPages')}</h4>
          <ul className="space-y-2 text-gray-400">
            <li><a href="#">{t('footerStore')}</a></li>
            <li><a href="#">{t('footerCollections')}</a></li>
            <li><a href="#">{t('footerSupport')}</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-3">{t('footerProduct')}</h4>
          <ul className="space-y-2 text-gray-400">
            <li><a href="#">{t('footerTerms')}</a></li>
            <li><a href="#">{t('footerPrivacy')}</a></li>
            <li><a href="#">{t('footerCopyright')}</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-3">{t('footerFollow')}</h4>
          <div className="flex space-x-6">
            <a href="https://www.instagram.com/pabausoftware/" target="_blank" rel="noopener noreferrer"><Image src="/Instagram.png" width={30} height={30} alt="Instagram"/></a>
            <a href="https://www.facebook.com/Pabau/" target="_blank" rel="noopener noreferrer"><Image src="/Facebook.png" width={30} height={30} alt="Facebook"/></a>
            <a href="https://x.com/PabauCRM" target="_blank" rel="noopener noreferrer"><Image src="/Twitter.png" width={30} height={30} alt="Twitter"/></a>
          </div>
        </div>
      </div>
      <div className="text-center mt-10">
        <button onClick={() => setLanguage('en')} disabled={language === 'en'} className="mx-2 px-3 py-1 text-sm rounded disabled:font-bold disabled:text-orange-500">English</button>
        <span className="text-gray-400">|</span>
        <button onClick={() => setLanguage('sq')} disabled={language === 'sq'} className="mx-2 px-3 py-1 text-sm rounded disabled:font-bold disabled:text-orange-500">Shqip</button>
      </div>
      <div className="text-center text-gray-500 text-sm mt-4">
        © {new Date().getFullYear()} VibeStrings. {t('footerRights')}
      </div>
    </footer>
  );
};

export default function Home() {
  const { loading, error, data } = useQuery(GET_BRANDS);
  const { t } = useLanguage();

  return (
    <>
      <Head>
        <title>{t('title')}</title>
      </Head>
      <main className="bg-white text-gray-800">
        {/* HERO SECTION */}
        <section className="w-full flex flex-col md:flex-row items-start justify-between pb-4 pt-4 md:pt-4">
          <div className="md:w-1/2 px-6 lg:pl-20 text-center md:text-left">
            <div className="flex items-center mb-20 justify-center md:justify-start">
              <Image src="/Butterfly.svg" alt="VibeStrings Logo" width={32} height={32} className="mr-2" />
              <span className="text-xl font-bold">VibeStrings</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-10 leading-tight">
              {t('heroTitle_main')} <br />
              <span className="text-orange-500">{t('heroTitle_orange')}</span>
            </h1>
            <p className="text-gray-600 mb-6 text-lg max-w-lg mx-auto md:mx-0">
              {t('heroSubtitle')}
            </p>
          </div>
          <div className="md:w-1/2 relative flex justify-center md:justify-end ">
            <div className="relative w-[700px] h-[900px] transform -translate-y-1/2 bg-white rounded-[250px] overflow-hidden -right-1 md:-right-1">
              <Image src="/guitar.jpg" alt="Electric guitar and amplifiers" layout="fill" objectFit="cover" />
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 rounded-[15px]">
                <Image src="/Butterfly1.svg" alt="Logo" width={90} height={100} />
              </div>
            </div>
          </div>
        </section>

        {/* BRANDS SECTION */}
        <section className="w-full text-center mt-[-200px]">
          <h2 className="text-5xl font-semibold mb-2">
            {t('brandsTitle_main')}
            <span className="text-orange-500">{t('brandsTitle_orange')}</span>
          </h2>
          <p className="text-gray-600 mb-12 max-w-lg mx-auto">
            {t('brandsSubtitle')}
          </p>
          {loading && <p>{t('loadingBrands')}</p>}
          {error && <p>{t('error')}: {error.message}</p>}
          {data && (
            <div className="max-w-12xl mx-auto px-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-y-20 gap-x-10 items-center justify-center">
              {data.findAllBrands.map((brand) => (
                <Link href={`/models/${brand.id}`} key={brand.id} className="p-2 flex justify-center items-center h-20 hover:opacity-80 transition">
                  <img src={brand.image} alt={brand.name} className="max-h-full max-w-full object-contain" />
                </Link>
              ))}
            </div>
          )}
        </section>

        {/* FEATURES SECTION */}
        <section className="bg-gray-900 text-white py-16">
          <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-3 gap-12 text-center">
            <div className="p-4">
              <div className="w-20 h-20 bg-[#262626] rounded-[20px] flex items-center justify-center mx-auto mb-4">
                <Image src="/category-2.png" alt="Smooth Browse Icon" width={32} height={32} />
              </div>
              <p className="text-xl font-bold mb-2">{t('feature1Title')}</p>
              <p className="text-gray-400">{t('feature1Desc')}</p>
            </div>
            <div className="p-4">
              <div className="w-20 h-20 bg-[#262626] rounded-[20px] flex items-center justify-center mx-auto mb-4">
                <Image src="/truck.png" alt="Easy Delivery Icon" width={32} height={32} />
              </div>
              <p className="text-xl font-bold mb-2">{t('feature2Title')}</p>
              <p className="text-gray-400">{t('feature2Desc')}</p>
            </div>
            <div className="p-4">
              <div className="w-20 h-20 bg-[#262626] rounded-[20px] flex items-center justify-center mx-auto mb-4">
                <Image src="/wallet.png" alt="Swift Payments Icon" width={32} height={32} />
              </div>
              <p className="text-xl font-bold mb-2">{t('feature3Title')}</p>
              <p className="text-gray-400">{t('feature3Desc')}</p>
            </div>
          </div>
        </section>

        {/* APP SECTION */}
        <section className="w-full bg-gray-50 py-16 flex flex-col-reverse md:flex-row items-center gap-12 overflow-hidden">
          <div className="w-full md:w-1/2 px-6 lg:pl-20 text-center md:text-left">
            <h3 className="text-3xl font-bold mb-4">
              {t('appSectionTitle_main')}{' '}
              <span className="text-orange-500">{t('appSectionTitle_orange')}</span>
              {' '}{t('appSectionTitle_after')}
            </h3>
            <div className="flex gap-4 mt-6 justify-center md:justify-start">
              <a href="https://play.google.com" target="_blank" rel="noopener noreferrer"><Image src="/googleplay.png" alt="Get it on Google Play" width={171} height={62} /></a>
              <a href="https://apps.apple.com" target="_blank" rel="noopener noreferrer"><Image src="/appstore.png" alt="Download on the App Store" width={171} height={57} /></a>
            </div>
          </div>
          {/* Kontejneri i ri për imazhet */}
          <div className="w-full md:w-1/2 h-[500px] flex justify-center items-center relative">
           
            <div className="absolute w-[500px] h-[354px] rounded-full bg-orange-500 opacity-80 md:opacity-100"></div>
            
            
            <div className="relative flex items-center justify-center w-full h-full gap-4 px-4">
              <div className="transform -translate-y-4">
                <Image src="/photo1.png" alt="Mobile App Preview 1" width={214} height={461} className="shadow-xl rounded-[25px]" />
              </div>
              <div className="transform translate-y-4">
                <Image src="/photo2.png" alt="Mobile App Preview 2" width={214} height={461} className="shadow-xl rounded-[25px]" />
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}
