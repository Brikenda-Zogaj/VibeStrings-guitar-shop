import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { useState, useMemo, useEffect } from "react";
import { useLanguage } from '../../context/LanguageContext';
import { useInView } from 'react-intersection-observer';

// GraphQL query to fetch brand and model data
const GET_BRAND_AND_MODELS = gql`
  query GetBrandAndModels($brandId: ID!, $sortBy: sortBy!) {
    findUniqueBrand(id: $brandId) { id name origin image }
    findBrandModels(id: $brandId, sortBy: $sortBy) { id name price image type }
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

const INITIAL_VISIBLE_COUNT = 6;

export default function GuitarModelsPage() {
  const router = useRouter();
  const { brandId } = router.query;
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE_COUNT);

  const sortBy = { field: "name", order: "ASC" };

  const { loading, error, data } = useQuery(GET_BRAND_AND_MODELS, {
    variables: { brandId, sortBy },
    skip: !brandId,
  });
  
  const brand = data?.findUniqueBrand;
  const models = data?.findBrandModels || [];

  const filteredModels = useMemo(() => {
    const modelsByType = selectedType 
      ? models.filter(model => model.type === selectedType)
      : models;
    return modelsByType.filter(model => 
      model.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [models, selectedType, searchTerm]);
  
  const currentModels = useMemo(() => filteredModels.slice(0, visibleCount), [filteredModels, visibleCount]);

  const { ref, inView } = useInView({ threshold: 0.1 });

  
  useEffect(() => {
    setVisibleCount(INITIAL_VISIBLE_COUNT);
  }, [searchTerm, selectedType]);

  // Loads more models on scroll
  useEffect(() => {
    if (inView && visibleCount < filteredModels.length) {
      setVisibleCount(prevCount => prevCount + 6);
    }
  }, [inView, visibleCount, filteredModels.length]);

  const guitarTypes = useMemo(() => [...new Set(models.map(model => model.type))], [models]);

  return (
    <>
      <Head>
        <title>{brand?.name || "Guitar Models"}</title>
      </Head>
      <main className="bg-white text-gray-800 min-h-screen flex flex-col">
        <Link href="/" className="text-gray-600 flex items-center hover:text-orange-500 transition px-6 pt-6">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          {t('backToHome')}
        </Link>
        <div className="flex-grow">
          <section className="w-full flex flex-col md:flex-row items-start justify-between pb-10 pt-10 md:pt-10">
              <div className="md:w-1/2 px-6 lg:pl-20 text-center md:text-left">
                  <div className="flex items-center mb-20 justify-center md:justify-start">
                      <Image src="/Butterfly.svg" alt="VibeStrings Logo" width={32} height={32} className="mr-2" />
                      <span className="text-xl font-bold">VibeStrings</span>
                  </div>
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-10 leading-tight">
                      {t('playLikeA')}{" "}
                      <span className="text-orange-500">{brand?.name || t('rockStar')}</span>
                  </h1>
                  <p className="text-gray-600 mb-6 text-lg max-w-lg mx-auto md:mx-0">
                      {brand?.name
                          ? t('discoverGuitars').replace('{brandName}', brand.name)
                          : t('exploreGuitars')}
                  </p>
              </div>
              <div className="md:w-1/2 relative flex justify-center md:justify-end">
                  <div className="relative w-[700px] h-[700px] transform -translate-y-1/2 rounded-[250px] overflow-hidden bg-gradient-to-b from-white via-orange-400 to-orange-500 ">
                      {brand?.image && (
                          <Image src={brand.image} alt={brand.name} layout="fill" objectFit="contain" />
                      )}
                      <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
                          <Image src="/Butterfly1.svg" alt="Logo" width={90} height={100} />
                      </div>
                  </div>
              </div>
          </section>

          <section className="mt-[-200px] pb-16">
            <div className="max-w-7xl mx-auto px-6">
              <h2 className="text-5xl font-bold mb-8 text-center">
                {t('checkSelection_main')}
                <span className="text-orange-500">{t('checkSelection_orange')}</span>
              </h2>
              <div className="flex items-center justify-center gap-4 mb-12">
                <div className="relative">
                  <select value={selectedType} onChange={(e) => setSelectedType(e.target.value)} className="w-80 px-4 py-3 pl-4 bg-white border border-gray-300 shadow-sm appearance-none focus:outline-none cursor-pointer text-sm">
                    <option value="">{t('filterByType')}</option>
                    {guitarTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
                <div className="relative">
                  <input type="text" placeholder={t('searchByName')} value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-80 px-4 py-3 pl-4 border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 transition text-sm" />
                </div>
              </div>

              {loading && currentModels.length === 0 ? (
                <p className="text-center mt-16">{t('loadingModels')}</p>
              ) : error ? (
                <p className="text-center mt-16 text-red-500">{t('error')}: {error.message}</p>
              ) : currentModels.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {currentModels.map((model) => (
                    <Link href={`/models/${brandId}/${model.id}`} key={model.id} className="block p-4 hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1">
                      <div className="relative w-full h-64 mb-4">
                        <Image src={model.image} alt={model.name} layout="fill" objectFit="contain" />
                      </div>
                      <h2 className="text-xl font-semibold mb-2">{model.name}</h2>
                      <p className="text-orange-500 font-bold">${model.price.toFixed(2)}</p>
                    </Link>
                  ))}
                </div>
              ) : (
                <p className="text-center text-gray-500 text-lg mt-16">{t('noModelsFound')}</p>
              )}
              
              {/* Infinite scroll */}
              {visibleCount < filteredModels.length && (
                  <div ref={ref} className="h-20 w-full flex justify-center items-center">
                      <p className="text-center">{t('loadingModels')}</p>
                  </div>
              )}
            </div>
          </section>
        </div>
        <Footer />
      </main>
    </>
  );
}
