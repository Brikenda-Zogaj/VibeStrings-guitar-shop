import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useLanguage } from '../../../context/LanguageContext';

const GET_MODEL_DETAILS = gql`
  query GetModelDetails($brandId: ID!, $modelId: ID!) {
    findUniqueModel(brandId: $brandId, modelId: $modelId) {
      id
      name
      image
      description
      specs {
        bodyWood
        neckWood
        fingerboardWood
        pickups
        tuners
        scaleLength
        bridge
      }
      musicians {
        name
        musicianImage
      }
    }
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
                        <span className="mr-2"><Image src="/sms.png" width={20} height={20} alt="email icon"/></span>
                        <Link href="mailto:brikendazogajj@gmail.com">{t('footerEnquiry')}</Link>
                    </div>
                    <div className="flex items-center text-gray-400">
                        <span className="mr-2"><Image src="/location.png" width={20} height={20} alt="location icon"/></span>
                        <Link href="https://www.google.com/maps/place/Pristina,+Kosovo">{t('footerLocation')}</Link>
                    </div>
                </div>
                <div>
                    <h4 className="font-semibold mb-3">{t('footerPages')}</h4>
                    <ul className="space-y-2 text-gray-400">
                        <li><Link href="#">{t('footerStore')}</Link></li>
                        <li><Link href="#">{t('footerCollections')}</Link></li>
                        <li><Link href="#">{t('footerSupport')}</Link></li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-semibold mb-3">{t('footerProduct')}</h4>
                    <ul className="space-y-2 text-gray-400">
                        <li><Link href="#">{t('footerTerms')}</Link></li>
                        <li><Link href="#">{t('footerPrivacy')}</Link></li>
                        <li><Link href="#">{t('footerCopyright')}</Link></li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-semibold mb-3">{t('footerFollow')}</h4>
                    <div className="flex space-x-6">
                        <Link href="https://www.instagram.com/pabausoftware/"><span className="text-xl"><Image src="/Instagram.png" width={30} height={30} alt="Instagram"/></span></Link>
                        <Link href="https://www.facebook.com/Pabau/"><span className="text-xl"><Image src="/Facebook.png" width={30} height={30} alt="Facebook"/></span></Link>
                        <Link href="https://x.com/PabauCRM"><span className="text-xl"><Image src="/Twitter.png" width={30} height={30} alt="Twitter"/></span></Link>
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


export default function ModelDetailsPage() {
  const router = useRouter();
  const { modelId, brandId } = router.query;
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState("specs");
  const [musicianPage, setMusicianPage] = useState(0);

  const { loading, error, data } = useQuery(GET_MODEL_DETAILS, {
    variables: { modelId, brandId },
    skip: !modelId || !brandId,
  });

  if (loading) return <p className="p-8 text-center">{t('loading')}</p>;
  if (error) return <p className="p-8 text-center">{t('error')}: {error.message}</p>;
  if (!data || !data.findUniqueModel) return <p className="p-8 text-center">{t('modelNotFound')}</p>;

  const model = data.findUniqueModel;
  const musicians = model.musicians || [];
  const displayMusicians = musicians.slice(musicianPage, musicianPage + 2);
  const totalMusicianPages = Math.max(1, Math.ceil(musicians.length / 2));

  return (
    <>
      <Head>
        <title>{t('modelDetailsTitle').replace('{modelName}', model.name)}</title>
      </Head>

      <main className="bg-white text-gray-800 min-h-screen flex flex-col" style={{ fontFamily: "'Poppins', system-ui, sans-serif" }}>
        <div className="px-6 pt-6">
          <div className="flex items-center justify-between w-full">
            <div className="flex flex-col items-start">
              <Link href={`/models/${brandId}`} className="text-gray-600 flex items-center hover:text-orange-500 transition mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                {t('backToList')}
              </Link>
              <div className="flex items-center space-x-3 text-black-500 ml-10">
                <Image src="/Butterfly.svg" alt="VibeStrings" width={30} height={30} />
                <span className="font-bold text-xl">VibeStrings</span>
              </div>
            </div>
          </div>
        </div>

        <header className="relative overflow-visible">
          <div className="px-6 mt-5 grid grid-cols-1 md:grid-cols-2 items-center gap-5 justify-center">
            <div className="py-12 md:py-20 text-center md:text-left mx-auto">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-10 leading-tight">
                {model.name}
              </h1>
            </div>
            <div className="relative h-56 md:h-72 w-full flex items-center justify-end">
              <div className="relative flex justify-center md:justify-end">
                <div className="relative w-[700px] h-[600px] -top-20 rounded-bl-[250px] rounded-br-[250px] overflow-hidden -right-10 md:-right-6 bg-gradient-to-b from-orange-50 via-orange-300 to-orange-600">
                  {model?.image && (
                    <Image src={model.image} alt={model.name} layout="fill" objectFit="contain" className="p-8" />
                  )}
                  <div className="absolute bottom-14 left-1/2 transform translate-y-1/1">
                    <Image src="/Butterfly1.svg" alt="Logo" width={90} height={100} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="mt-[200px] border-b border-gray-200">
          <div className="px-6">
            <div className="relative">
              <div className="flex justify-center">
                <button onClick={() => setActiveTab("specs")} className={`px-8 py-4 font-semibold text-lg transition ${activeTab === "specs" ? "text-orange-500" : "text-gray-600 hover:text-gray-800"}`}>
                  {t('specification')}
                </button>
                <button onClick={() => setActiveTab("musicians")} className={`px-8 py-4 font-semibold text-lg transition ${activeTab === "musicians" ? "text-orange-500" : "text-gray-600 hover:text-gray-800"}`}>
                  {t('whoPlaysIt')}
                </button>
              </div>
              <div className="absolute left-0 right-0 -bottom-px h-0.5 bg-gray-200" />
              <div className="absolute -bottom-1 h-1.5 bg-orange-500 transition-all duration-300" style={{ width: 140, left: activeTab === 'specs' ? 'calc(50% - 160px)' : 'calc(50% + 20px)' }} />
            </div>
          </div>
        </div>

        <section className="px-6 py-12 flex-grow">
          <div className="bg-white p-10 rounded-lg shadow-sm">
            {activeTab === "specs" && (
              <div className="md:flex md:items-start md:space-x-12">
                <div className="md:flex-1">
                  <p className="text-gray-600 mb-6 ">{model.description}</p>
                  
                  <ul className="space-y-3 text-gray-800 list-inside">
                    <li><strong>{t('bodyWood')}:</strong> {model.specs.bodyWood}</li>
                    <li><strong>{t('neckWood')}:</strong> {model.specs.neckWood}</li>
                    <li><strong>{t('fingerboard')}:</strong> {model.specs.fingerboardWood}</li>
                    <li><strong>{t('pickups')}:</strong> {model.specs.pickups}</li>
                    <li><strong>{t('tuners')}:</strong> {model.specs.tuners}</li>
                    <li><strong>{t('scaleLength')}:</strong> {model.specs.scaleLength}</li>
                    <li><strong>{t('bridge')}:</strong> {model.specs.bridge}</li>
                  </ul>
                </div>
              </div>
            )}
            {activeTab === "musicians" && (
              <div>
                {musicians.length > 0 ? (
                  <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                      {displayMusicians.map((m, i) => (
                        <div key={i} className="flex flex-col items-center p-4">
                          <div className="relative w-90 h-90 overflow-hidden rounded-lg shadow-md">
                            <Image src={m.musicianImage} alt={m.name} layout="fill" objectFit="cover" />
                          </div>
                          <div className="mt-4 text-center font-semibold text-lg">{m.name}</div>
                        </div>
                      ))}
                    </div>
                    {totalMusicianPages > 1 && (
                      <div className="flex justify-center items-center space-x-4 mt-8">
                        <button onClick={() => setMusicianPage(Math.max(0, musicianPage - 2))} disabled={musicianPage === 0} className="px-3 py-1 rounded bg-gray-200 disabled:opacity-50">
                          {t('prev')}
                        </button>
                        <div className="flex space-x-2">
                          {Array.from({ length: totalMusicianPages }).map((_, idx) => (
                            <button key={idx} onClick={() => setMusicianPage(idx * 2)} className={`w-3 h-3 rounded-full ${musicianPage / 2 === idx ? "bg-orange-500" : "bg-gray-300"}`} />
                          ))}
                        </div>
                        <button onClick={() => setMusicianPage(Math.min((totalMusicianPages - 1) * 2, musicianPage + 2))} disabled={musicianPage >= (totalMusicianPages - 1) * 2} className="px-3 py-1 rounded bg-gray-200 disabled:opacity-50">
                          {t('next')}
                        </button>
                      </div>
                    )}
                  </>
                ) : (
                  <p className="text-gray-500">{t('noMusicians')}</p>
                )}
              </div>
            )}
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}