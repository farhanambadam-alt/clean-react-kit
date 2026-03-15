import { useState, useEffect, useCallback } from 'react';
import { Search, MapPin, Bell, ChevronDown, Star, RotateCcw, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import FeaturedCarousel from '@/components/FeaturedCarousel';
import CategoryChips from '@/components/CategoryChips';
import NearbySalonCard from '@/components/NearbySalonCard';
import GenderToggle from '@/components/GenderToggle';
import NotificationDrawer from '@/components/NotificationDrawer';
import LocationPickerDrawer from '@/components/LocationPickerDrawer';
import ScrollToTop from '@/components/ScrollToTop';
import { categories, featuredSalons, nearbySalons, bookings } from '@/data/mockData';
import { useGender } from '@/contexts/GenderContext';

const HomePage = () => {
  const { gender } = useGender();
  const navigate = useNavigate();
  const [selectedCategory] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [notifOpen, setNotifOpen] = useState(false);
  const [locationOpen, setLocationOpen] = useState(false);

  const genderCategories = categories.filter((c) => c.gender === gender);
  const completedBookings = bookings.filter((b) => b.status === 'completed');

  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(t);
  }, []);

  const SkeletonCard = () => (
    <div className="flex-shrink-0 w-52 bg-card rounded-2xl overflow-hidden card-shadow">
      <div className="h-32 skeleton-shimmer rounded-t-2xl" />
      <div className="p-3 space-y-2">
        <div className="h-4 w-3/4 skeleton-shimmer rounded-full" />
        <div className="h-3 w-1/2 skeleton-shimmer rounded-full" />
      </div>
    </div>
  );

  return (
    <div id="main-content" className="min-h-screen pb-20 md:max-w-5xl md:mx-auto">
      {/* Header — fixed, native-safe for Flutter WebView (iOS/Android) */}
      <header
        className="fixed top-0 left-0 right-0 z-30 border-b border-border/30 md:max-w-5xl md:mx-auto"
        style={{
          paddingTop: 'calc(env(safe-area-inset-top, 0px) + 8px)',
          paddingLeft: 'env(safe-area-inset-left, 0px)',
          paddingRight: 'env(safe-area-inset-right, 0px)',
          background: 'hsl(var(--background) / 0.96)',
          WebkitBackdropFilter: 'saturate(180%) blur(16px)',
          backdropFilter: 'saturate(180%) blur(16px)',
          transform: 'translateZ(0)',
          WebkitTransform: 'translateZ(0)',
        }}
      >
        <div className="px-5 pb-3 pt-1">
          <div className="flex items-center justify-between">
            {/* Profile + Greeting */}
            <button
              onClick={() => navigate('/profile')}
              className="flex items-center gap-3 min-h-[48px] active:opacity-70 transition-opacity duration-150"
              aria-label="Go to profile"
            >
              <div className="w-11 h-11 rounded-full overflow-hidden ring-2 ring-accent/25 shadow-md">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop"
                  alt="Profile"
                  className="w-full h-full object-cover"
                  decoding="async"
                  width={44}
                  height={44}
                  onError={(e) => { (e.target as HTMLImageElement).src = '/placeholder.svg'; }}
                />
              </div>
              <div className="text-left">
                <p className="text-[11px] text-muted-foreground font-body leading-none tracking-widest uppercase">Welcome back</p>
                <p className="font-heading font-bold text-[16px] text-foreground mt-0.5 tracking-tight">Aarav</p>
              </div>
            </button>

            {/* Action buttons — 48px tap targets for Flutter WebView */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setLocationOpen(true)}
                className="flex items-center gap-1.5 bg-card/90 border border-border/50 px-3 rounded-xl min-h-[48px] shadow-sm active:scale-[0.96] transition-transform duration-150"
                aria-label="Select location"
              >
                <MapPin size={15} className="text-accent" />
                <span className="text-[13px] font-body font-semibold text-foreground">Bangalore</span>
                <ChevronDown size={12} className="text-muted-foreground/70" />
              </button>
              <button
                onClick={() => setNotifOpen(true)}
                className="relative bg-card/90 border border-border/50 rounded-xl min-h-[48px] min-w-[48px] flex items-center justify-center shadow-sm active:scale-[0.96] transition-transform duration-150"
                aria-label="Notifications"
              >
                <Bell size={19} className="text-foreground" />
                <span className="absolute top-3 right-3 w-[7px] h-[7px] bg-accent rounded-full ring-[2px] ring-background" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Spacer for fixed header */}
      <div style={{ height: 'calc(env(safe-area-inset-top, 0px) + 72px)' }} />

      {/* Gender Toggle + Heading */}
      <div className="px-5 pt-2 pb-3">
        <div className="flex items-center justify-between mb-4">
          <h1 className="font-serif text-[26px] text-foreground italic leading-tight tracking-tight">
            {gender === 'female' ? 'Beauty & Wellness' : 'Grooming & Style'}
          </h1>
        </div>
        <GenderToggle variant="pill" />
      </div>

      {/* Search */}
      <div className="px-5 py-2">
        <button
          onClick={() => navigate('/explore')}
          className="w-full flex items-center gap-3 bg-card border border-border rounded-2xl px-4 py-3.5 card-shadow min-h-[48px]"
          aria-label="Search salons and services"
        >
          <Search size={17} className="text-muted-foreground flex-shrink-0" />
          <span className="text-[14px] font-body text-muted-foreground">Search salons, services...</span>
        </button>
      </div>

      {/* Categories */}
      <div className="pt-3">
        <CategoryChips
          categories={genderCategories}
          selected={selectedCategory}
          onSelect={(id) => {
            const cat = genderCategories.find(c => c.id === id);
            if (cat) {
              navigate(`/explore?category=${encodeURIComponent(cat.name.toLowerCase())}`);
            }
          }}
        />
      </div>

      {/* Featured */}
      <div className="pt-5">
        <div className="flex items-center justify-between px-5 mb-3">
          <h2 className="font-heading font-semibold text-[16px] text-foreground">Featured Salons</h2>
          <button
            onClick={() => navigate('/explore?category=salon&sort=nearby')}
            className="text-[12px] font-heading font-medium text-primary flex items-center gap-0.5 min-h-[44px] px-2"
            aria-label="View all featured salons"
          >
            View All <ArrowRight size={12} />
          </button>
        </div>
        {isLoading ? (
          <div className="mx-5 aspect-[16/10] skeleton-shimmer rounded-2xl" />
        ) : (
          <FeaturedCarousel salons={featuredSalons} />
        )}
      </div>

      {/* Nearby */}
      <div className="pt-6">
        <div className="flex items-center justify-between px-5 mb-3">
          <h2 className="font-heading font-semibold text-[16px] text-foreground">Nearby</h2>
          <button
            onClick={() => navigate('/explore?category=salon&sort=nearby')}
            className="text-[12px] font-heading font-medium text-primary flex items-center gap-0.5 min-h-[44px] px-2"
            aria-label="View all nearby salons"
          >
            View All <ArrowRight size={12} />
          </button>
        </div>
        <div className="flex gap-3 overflow-x-auto px-5 pb-4 scrollbar-hide md:grid md:grid-cols-3 lg:grid-cols-4 md:overflow-x-visible" style={{ contain: 'layout style' }}>
          {isLoading ? (
            <><SkeletonCard /><SkeletonCard /></>
          ) : (
            nearbySalons.map((salon) => <NearbySalonCard key={salon.id} salon={salon} />)
          )}
        </div>
      </div>

      {/* Suggested */}
      <div className="pt-1 pb-2">
        <div className="flex items-center justify-between px-5 mb-3">
          <h2 className="font-heading font-semibold text-[16px] text-foreground">Suggested for You</h2>
        </div>
        <div className="px-5 space-y-2.5 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-3 md:space-y-0">
          {!isLoading &&
            [...featuredSalons, ...nearbySalons].slice(0, 3).map((salon) => (
              <div
                key={salon.id}
                onClick={() => navigate(`/salon/${salon.id}`)}
                className="flex items-center gap-3.5 bg-card rounded-2xl p-3 card-shadow border border-border cursor-pointer active:scale-[0.98] transition-transform"
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && navigate(`/salon/${salon.id}`)}
              >
                 <img
                   src={salon.image}
                   alt={salon.name}
                   className="w-[60px] h-[60px] rounded-xl object-cover flex-shrink-0"
                   decoding="async"
                   width={60}
                   height={60}
                   onError={(e) => { (e.target as HTMLImageElement).src = '/placeholder.svg'; }}
                 />
                <div className="flex-1 min-w-0">
                  <h3 className="font-heading font-semibold text-[14px] text-foreground truncate">{salon.name}</h3>
                  <p className="text-[12px] font-body text-muted-foreground mt-0.5 truncate">{salon.address} · {salon.distance}</p>
                  <div className="flex items-center gap-1.5 mt-1">
                    <Star size={11} className="text-accent fill-accent" />
                    <span className="text-[12px] text-foreground font-medium">{salon.rating}</span>
                    <span className="text-[11px] text-muted-foreground">· From ₹{salon.startingPrice}</span>
                  </div>
                </div>
                <button
                  onClick={(e) => { e.stopPropagation(); navigate(`/salon/${salon.id}`); }}
                  className="text-[12px] font-heading font-semibold btn-themed px-4 py-2 rounded-xl flex-shrink-0 min-h-[44px]"
                >
                  Book
                </button>
              </div>
            ))}
        </div>
      </div>

      {/* Book Again */}
      {completedBookings.length > 0 && (
        <div className="pt-5 pb-3">
          <div className="flex items-center gap-2 px-5 mb-3">
            <RotateCcw size={15} className="text-primary" />
            <h2 className="font-heading font-semibold text-[16px] text-foreground">Book Again</h2>
          </div>
          <div className="flex gap-3 overflow-x-auto px-5 pb-3 scrollbar-hide" style={{ contain: 'layout style' }}>
            {completedBookings.map((booking) => (
              <div key={booking.id} className="flex-shrink-0 w-60 bg-card rounded-2xl p-3.5 card-shadow border border-border">
                <div className="flex items-center gap-3">
                  <img
                    src={booking.salonImage}
                    alt={booking.salonName}
                    className="w-12 h-12 rounded-xl object-cover flex-shrink-0"
                    decoding="async"
                    loading="lazy"
                    width={48}
                    height={48}
                    onError={(e) => { (e.target as HTMLImageElement).src = '/placeholder.svg'; }}
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-heading font-semibold text-[13px] text-foreground truncate">{booking.salonName}</h4>
                    <p className="text-[11px] font-body text-muted-foreground truncate">{booking.services.join(', ')}</p>
                  </div>
                </div>
                <button
                  onClick={() => navigate(`/salon/1`)}
                  className="w-full mt-3 text-[12px] font-heading font-semibold text-primary bg-primary/8 py-2.5 rounded-xl active:scale-95 transition-transform border border-primary/15 min-h-[44px]"
                >
                  Rebook
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Drawers */}
      <NotificationDrawer open={notifOpen} onClose={() => setNotifOpen(false)} />
      <LocationPickerDrawer open={locationOpen} onClose={() => setLocationOpen(false)} />
      <ScrollToTop />
    </div>
  );
};

export default HomePage;
