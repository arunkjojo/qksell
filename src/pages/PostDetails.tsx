import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { 
  MapPin, 
  Calendar, 
  Heart, 
  Share2,
  ChevronLeft, 
  ChevronRight,
  Rocket,
} from 'lucide-react';
import { BsWhatsapp, BsFillEyeFill } from 'react-icons/bs';
import { fetchPostById, fetchSimilarPostById } from '@api/index';
import Button from '@ui/Button';
import ErrorAlert from '@ui/ErrorAlert';
import { formatPrice } from '@utils/formatPrice';
import { base64Decode } from '@utils/base64Decode';
import { getCookie } from '@utils/getCookie';
import { setMetaTag } from '@utils/metaUtils';
import { Product } from '@common/types';
import { toCapitalize } from '@utils/toCapitalize';
import { setCookie } from '@utils/setCookie';
import { joinWhatsappGroup } from '@utils/joinWhatsAppGroup';

export const PostDetails: React.FC = () => {
  const params = useParams();
  const navigate = useNavigate()
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [product, setProduct] = useState<Product | null>(null);
  const [similarPosts, setSimilarPosts] = useState<Product[] | null>(null);
  const [isSellerPost, setIsSellerPost] = useState(false);
  const { id } = params;
  const authTokenId = parseInt(base64Decode(base64Decode(getCookie('userToken') ?? '')), 10);
  useEffect(() => {
    const sellerId = parseInt(product?.seller?.id || '', 10);
    setIsSellerPost(!isNaN(sellerId) && !isNaN(authTokenId) && sellerId === authTokenId);
  }, [product, authTokenId])
  useEffect(() => {
    if (!id) {
      console.error('Invalid post ID');
      return;
    }
    const numericId = parseInt(id, 10);
    if (isNaN(numericId)) {
      console.error('Post ID is not a valid number');
      return;
    }
    const getPostById = async () => {
      const response = await fetchPostById(numericId);
      if (response) {
        setIsLoading(false);
      } else {
        setTimeout(() => {
          setIsLoading(false);
        }, 2000);
      }
      setProduct(response?.data[0]);
    };
    const getSimilarPosts = async () => {
      const response = await fetchSimilarPostById(numericId);
      setSimilarPosts(response?.data);
    };
    getPostById();
    getSimilarPosts();
  }, [id]);

  useEffect(() => {
    if (product) {
      document.title = product?.title;

      setMetaTag("og:title", product?.title);
      setMetaTag("og:description", product?.description);
      setMetaTag("og:image", product?.images[0]);
      setMetaTag("og:url", window.location.href);

      setMetaTag("twitter:card", "summary_large_image", false);
      setMetaTag("twitter:title", product?.title, false);
      setMetaTag("twitter:description", product?.description, false);
      setMetaTag("twitter:image", product?.images[0], false);

      if (product?.location?.link) setCookie('whatsappLink', product?.location?.link);
    }
  }, [product]);

  useEffect(() => {
    const fav = localStorage.getItem('favItems') || '[]';
    let favoritesItems = [];
    try {
      favoritesItems = JSON.parse(fav);
    } catch {
      favoritesItems = [];
    }
    const postId = product?.id;
    setIsFavorite(postId ? favoritesItems.includes(postId) : false);
  }, [product]);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Share my post',
          text: product?.title,
          url: window.location.href, // share current page
        });
        console.log('Content shared successfully');
      } catch (error) {
        console.error('Error sharing', error);
      }
    }
  };

  if (!isLoading && (!product || !id)) {
    return (
      <ErrorAlert message="The post you're looking for doesn't exist or has been removed." />
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const nextImage = () => {
    setActiveImageIndex((prevIndex) => 
      prevIndex === (product?.images?.length || 0) - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setActiveImageIndex((prevIndex) => 
      prevIndex === 0 ? ((product?.images?.length || 1) - 1) : prevIndex - 1
    );
  };

  const toggleFavorite = () => {
    const fav = localStorage.getItem('favItems') || '[]';
    let favoritesItems = [];
    try {
      favoritesItems = JSON.parse(fav);
    } catch {
      favoritesItems = [];
    }
    const postId = product?.id;
    if (!postId) return;
    const index = favoritesItems.indexOf(postId);
    if (index > -1) {
      // Remove from favorites
      favoritesItems.splice(index, 1);
      setIsFavorite(false);
    } else {
      // Add to favorites with max 10 items
      if (favoritesItems.length >= 10) {
        favoritesItems.shift(); // Remove the first (oldest) item
      }
      favoritesItems.push(postId);
      setIsFavorite(true);
    }
    localStorage.setItem('favItems', JSON.stringify(favoritesItems));
  };

  const handlePromote = () => navigate(`/cart/${params?.id}`);

  const whatsAppMessage = (phoneNumber: string = "919995468633") => {
    const message = `Hello, I'm interested in your advertisement on qksell.in.\n${product?.title}\n${window.location.href}`;
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  const importanceIndicate = () => <span className='text-red-600'>*</span>
  return (
    <>
      <Helmet>
        <title>{product?.title + ' | ' || ''}Qksell.in Marketplace</title>
        <meta name="description" content={product?.description} />
        <meta name="og:title" content={product?.title} />
        <meta name="og:description" content={product?.description} />
        <meta name="og:image" content={product?.images[0]} />
        <meta name="og:url" content={window.location.href} />
      </Helmet>
      <div className="bg-gray-50 py-4 min-h-screen">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="flex flex-col lg:flex-row">
              {/* Image Gallery */}
              <div className="lg:w-3/5 relative">
                <div className="aspect-[4/3] bg-gray-100 relative">
                  <img 
                    src={product?.images[activeImageIndex]} 
                    alt={product?.title} 
                    className="w-full h-full object-cover"
                  />
                  
                  {(product?.images?.length || 0) > 1 && (
                    <>
                      <button 
                        onClick={prevImage}
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-md transition-colors"
                        aria-label="Previous image"
                      >
                        <ChevronLeft size={20} />
                      </button>
                      <button 
                        onClick={nextImage}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-md transition-colors"
                        aria-label="Next image"
                      >
                        <ChevronRight size={20} />
                      </button>
                    </>
                  )}
                </div>
                
                {(product?.images?.length || 0) > 1 && (
                  <div className="flex gap-2 p-4 overflow-x-auto">
                    {product?.images.map((image, index) => (
                      <button 
                        key={index}
                        onClick={() => setActiveImageIndex(index)}
                        className={`
                          w-20 h-20 flex-shrink-0 rounded-md overflow-hidden border-2
                          ${activeImageIndex === index ? 'border-blue-600' : 'border-transparent'}
                        `}
                      >
                        <img 
                          src={image} 
                          alt={`${product.title} - Image ${index + 1}`} 
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>
              
              {/* Product Details */}
              <div className="lg:w-2/5 p-4">
                <div className="flex flex-col justify-between mb-4">
                  <h1 className="text-md font-bold text-gray-900">{product?.title}</h1>
                  <h4 className="text-sm font-bold text-gray-900 local_lang">{product?.local_title}</h4>
                  <div className="flex flex-col gap-1 mb-2">
                    <button
                      onClick={joinWhatsappGroup}
                      className="p-2 gap-1 flex justify-start bg-green-700 text-white rounded-xl border text-center w-fit text-sm font-semibold"
                    >
                      <BsWhatsapp size={18} color="white" />
                      Join {product?.location?.name} WhatsApp Group
                    </button>
                    <p>Join group, daily updates</p>
                  </div>
                  <div className="flex gap-2">
                    <button 
                      onClick={toggleFavorite}
                      className={`p-2 rounded-full border ${
                        isFavorite 
                          ? 'bg-red-50 border-red-200 text-red-500' 
                          : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100'
                      }`}
                      aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                    >
                      <Heart size={20} className={isFavorite ? 'fill-red-500' : ''} />
                    </button>
                    <button 
                      className="p-2 rounded-full bg-gray-50 border border-gray-200 text-gray-600 hover:bg-gray-100"
                      aria-label="Share"
                      onClick={handleShare}
                    >
                      <Share2 size={20} />
                    </button>
                  </div>
                </div>
                
                <div className="mb-6">
                  <div className="text-3xl font-bold text-blue-600 mb-2">
                    {formatPrice(parseInt(String(product?.price || '0'), 10))}
                  </div>
                  <div className="flex flex-col md:flex-row gap-4 text-sm text-gray-600">
                    <div className="flex items-center">
                      <MapPin size={16} className="mr-1" />
                      {product?.location?.name}
                    </div>
                    <div className="flex items-center">
                      <Calendar size={16} className="mr-1" />
                      Posted on {formatDate(product?.createdAt || '')}
                    </div>
                    <div className="flex items-center">
                      <BsFillEyeFill size={16} className="mr-1" />
                      {product?.view || 0} Views
                    </div>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h2 className="text-lg font-medium text-gray-900 mb-2">Description</h2>
                  <p className="text-gray-700 whitespace-pre-line leading-relaxed">
                    {product?.description}
                  </p>
                </div>
                
                <div className="mb-6 pb-6 border-b border-gray-200">
                  <h2 className="text-lg font-medium text-gray-900 mb-2">Seller Information</h2>
                  <div className="flex items-center mb-2">
                    <div className="px-4 py-2">
                      <p className="font-bold text-[rgb(27,135,62)]">{product?.isOwner} Listed</p>
                      {product?.commission && (<p className="font-bold text-[rgb(27,135,62)]">{product?.commission} {importanceIndicate()}</p>)}
                    </div>


                  </div>
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-[rgb(27,135,62)] rounded-full flex items-center justify-center text-white font-bold text-lg mr-3">
                      {product?.seller?.name.charAt(0)?.toUpperCase()}
                    </div>
                    <div className="flex flex-col md:flex-row">
                      <h3 className="font-medium cursor-pointer hover:text-[rgb(27,135,62)]" onClick={() => whatsAppMessage(product?.seller?.number)}>{toCapitalize(product?.seller?.name || '')}</h3>
                      <span className="hidden md:block pr-2">, </span>
                      <h5 className="font-medium cursor-pointer hover:text-[rgb(27,135,62)]" onClick={() => whatsAppMessage(product?.seller?.number)}>{product?.seller?.number || ''}</h5>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col gap-3">
                  {isSellerPost && (
                    <Button
                      variant="primary"
                      size="lg"
                      icon={<Rocket size={18} />}
                      fullWidth
                      onClick={handlePromote}
                    >
                      Promote this Post
                    </Button>
                  )}
                  <Button
                    variant="outline"
                    className='!bg-green-700 !text-white'
                    size="lg"
                    icon={<BsWhatsapp size={18} />}
                    fullWidth
                    onClick={() => whatsAppMessage(product?.seller?.number)}
                  >
                    Contact Seller
                  </Button>
                </div>
                
                <div className="mt-6 text-center text-sm font-bold text-red-500">
                  * Confirm all details with seller before trade
                </div>
              </div>
            </div>
          </div>
          
          {/* Similar Listings - placeholder */}
          <div className="mt-12">
            {similarPosts && similarPosts?.length > 0 && <h3 className="text-2xl font-bold text-gray-900 mb-6">Similar Listings</h3>}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {similarPosts && similarPosts?.length > 0 && similarPosts?.map(similarProduct => (
                <Link
                  to={`/p/${similarProduct?.id}`}
                  className="group bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 border-2 border-gray-400 flex flex-row overflow-hidden !pr-1"
                  key={similarProduct?.id}
                >
                  {/* Left Side - Image */}
                  <div className="relative rounded-lg w-1/3">
                    <div className="aspect-[5/3] w-full bg-gray-200 relative h-full">
                      <img
                        src={similarProduct?.images[0]}
                        alt={similarProduct?.title}
                        className="w-full h-full object-cover transform transition-transform duration-700 scale-100"
                      />
                    </div>
                  </div>
            
                  {/* Right Side - Content */}
                  <div className="p-2 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex flex-wrap items-start justify-between gap-2">
                        <h4 className="font-medium text-[0.75rem] text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                          {similarProduct?.title?.replace(' , ', ', ')?.replace(', ', ',')?.replace(',', ', ')}
                        </h4>
                        <div className='flex justify-between w-full'>
                        <div className="font-bold text-blue-600"> {formatPrice(similarProduct.price)} </div>
                          <div className="text-gray-500 text-sm mt-1 bg-yellow-300 rounded-md px-2">{similarProduct?.location?.name}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};