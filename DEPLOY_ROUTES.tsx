/**
 * ADD THESE ROUTES TO src/App.tsx
 * Copy and paste into your route definitions
 */

// IMPORTS (add to top of App.tsx)
import OsteoarthritisHub from './pages/OsteoarthritisHub';
import RheumatoidArthritisHub from './pages/RheumatoidArthritisHub';
import PainManagementHub from './pages/PainManagementHub';
import ExerciseHub from './pages/ExerciseHub';
import NutritionHub from './pages/NutritionHub';
import MentalHealthHub from './pages/MentalHealthHub';
import ArthritisTypesHub from './pages/ArthritisTypesHub';
import TreatmentsHub from './pages/TreatmentsHub';
import LivingWellHub from './pages/LivingWellHub';
import SEODashboard from './components/SEODashboard';
import CityPageOptimized from './pages/CityPageOptimized';

// ROUTES (add to your route definitions)
<Routes>
  {/* Hub pages (9 routes) */}
  <Route path="/library/osteoarthritis-hub" element={<OsteoarthritisHub />} />
  <Route path="/library/rheumatoid-arthritis-hub" element={<RheumatoidArthritisHub />} />
  <Route path="/library/pain-management-hub" element={<PainManagementHub />} />
  <Route path="/library/exercise-hub" element={<ExerciseHub />} />
  <Route path="/library/nutrition-hub" element={<NutritionHub />} />
  <Route path="/library/mental-health-hub" element={<MentalHealthHub />} />
  <Route path="/library/arthritis-types-hub" element={<ArthritisTypesHub />} />
  <Route path="/library/treatments-hub" element={<TreatmentsHub />} />
  <Route path="/library/living-well-hub" element={<LivingWellHub />} />

  {/* City pages (51 dynamic routes) */}
  <Route path="/arthritis-support/:city" element={<CityPageOptimized />} />

  {/* SEO Dashboard */}
  <Route path="/seo-dashboard" element={<SEODashboard />} />

  {/* ... rest of your routes ... */}
</Routes>
