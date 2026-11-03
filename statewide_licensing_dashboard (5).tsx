import React, { useState, useMemo, useRef, useEffect } from 'react';
import { 
  Search, 
  Building2, 
  MapPin, 
  CreditCard, 
  Award, 
  Users, 
  FileText, 
  AlertTriangle, 
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  Phone,
  Briefcase
} from 'lucide-react';

const BUSINESS_DATA = [
  {"name": "THE QUICK STOP", "type": "General Retail Sales", "address": "1725 E Charleston Blvd A", "zip": "89104", "phone": "(702)806-6925", "license": "G71-07278", "status": "Active", "owner": "MX3 - LLC", "certifications": ["Women-Owned"]}, 
  {"name": "THE RAIDER CLAW", "type": "Mobile Food Trailer", "address": "439 Rock Quarry Way", "zip": "89032", "phone": "(901)736-2809", "license": "G70-03300", "status": "Active", "owner": "Robert Kimbrough jr - Owner", "certifications": ["Veteran-Owned", "Minority-Owned"]}, 
  {"name": "THE SCULPTING SANCTUARY OF LAS VEGAS", "type": "Cosmetological Establishment", "address": "6364 W Sahara Ave", "zip": "89146", "phone": "(714)423-4486", "license": "G72-04186", "status": "Active", "owner": "Hill Country Beauty & Wellness LLC", "certifications": ["Women-Owned"]}, 
  {"name": "THE SEALS OF LAS VEGAS", "type": "Repair and Maintenance", "address": "2300 W Sahara Ave 800", "zip": "89102", "phone": "(714)408-8733", "license": "G74-00543", "status": "Active", "owner": "Roberto San Jose - Managing Member", "certifications": []}, 
  {"name": "THE STRAT, HOTEL, CASINO & TOWER - STARBUCKS", "type": "Food Services or Cafe", "address": "2000 S Las Vegas Blvd", "zip": "89104", "phone": "(702)383-5251", "license": "R10-00381", "status": "Active", "owner": "STRATOSPHERE GAMING LLC - Corp", "certifications": []},
  {"name": "THE PLAZA SALON", "type": "Cosmetological Establishment", "address": "6031 W Cheyenne Ave 2ND FLOOR", "zip": "89108", "phone": "(702)658-5882", "license": "G62-09600", "status": "Closed", "owner": "Emeritus Corporation - Corp", "certifications": ["Women-Owned"]},
  {"name": "THE RABBIT AND THE MAGIC GARLICS", "type": "Mobile Food Trailer", "address": "1935 Fremont St", "zip": "89101", "phone": "(415)632-6180", "license": "G72-00062", "status": "Closed", "owner": "Gregory Van Poole Jr", "certifications": []}
];

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBusiness, setSelectedBusiness] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const searchRef = useRef(null);

  // Filter dataset based on search query
  const filteredBusinesses = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const query = searchQuery.toLowerCase();
    return BUSINESS_DATA.filter(
      (b) => b.name.toLowerCase().includes(query) || b.license.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  // Handle clicking outside of search to close dropdown
  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelectBusiness = (business) => {
    setSelectedBusiness(business);
    setSearchQuery(business.name);
    setIsDropdownOpen(false);
  };

  // Mock a realistic-looking tax ID based on the real zip and license
  const generateMockTaxId = (business) => {
    return `NV-${business.zip}-${business.license.replace('-', '').slice(0, 5)}`;
  };

  return (
    <div className="h-screen max-h-screen bg-slate-50 text-slate-800 overflow-hidden flex flex-col font-sans">
      
      {/* Top Header - Navy */}
      <header className="bg-[#3c49a6] text-white shadow-md shrink-0 border-b-4 border-[#41b6e6]">
        <div className="w-full px-6 py-3 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="bg-white p-1.5 rounded-full shadow-sm">
              <ShieldCheck className="h-7 w-7 text-[#41b6e6]" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight leading-tight text-white">Nevada Statewide Licensing</h1>
              <p className="text-[#41b6e6] text-xs font-bold uppercase tracking-wider leading-tight">City of Las Vegas Open Data</p>
            </div>
          </div>
        </div>
      </header>

      {/* Large Search Section */}
      <div className="bg-white border-b border-slate-200 shadow-sm shrink-0 z-10 relative px-6 py-5">
        <div className="max-w-4xl mx-auto" ref={searchRef}>
          <label className="block text-sm font-bold text-[#3c49a6] mb-2 uppercase tracking-wide">
            Search for a Business
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-6 w-6 text-slate-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-12 pr-4 py-4 border-2 border-slate-200 rounded-lg leading-5 bg-slate-50 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-0 focus:border-[#41b6e6] text-lg transition-all shadow-inner"
              placeholder="Start typing a business name (e.g., 'The Quick Stop', 'The Raider Claw')..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setIsDropdownOpen(true);
              }}
              onFocus={() => setIsDropdownOpen(true)}
            />
            {searchQuery && (
              <button 
                onClick={() => {
                  setSearchQuery('');
                  setSelectedBusiness(null);
                  setIsDropdownOpen(false);
                }}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600"
              >
                <XCircle className="h-5 w-5" />
              </button>
            )}
          </div>

          {/* Autocomplete Dropdown */}
          {isDropdownOpen && searchQuery.trim() !== '' && (
            <div className="absolute left-0 right-0 mt-2 mx-6 bg-white border border-slate-200 rounded-lg shadow-xl max-h-80 overflow-y-auto">
              {filteredBusinesses.length > 0 ? (
                <ul className="divide-y divide-slate-100">
                  {filteredBusinesses.map((b, idx) => (
                    <li 
                      key={idx} 
                      className="px-4 py-3 hover:bg-slate-50 cursor-pointer flex justify-between items-center transition-colors"
                      onClick={() => handleSelectBusiness(b)}
                    >
                      <div>
                        <p className="font-bold text-[#3c49a6]">{b.name}</p>
                        <p className="text-xs text-slate-500">{b.address}, {b.zip} • {b.type}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${b.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                          {b.status}
                        </span>
                        <span className="text-xs font-mono text-slate-400">{b.license}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="px-4 py-6 text-center text-slate-500">
                  No businesses found matching "{searchQuery}"
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <main className="flex-1 w-full px-6 py-6 min-h-0 bg-slate-100 overflow-y-auto">
        {!selectedBusiness ? (
          <div className="flex flex-col items-center justify-center h-full text-slate-400 opacity-60 mt-10">
            <Search className="h-16 w-16 mb-4 text-slate-300" />
            <h2 className="text-xl font-bold text-slate-400">Search to view business dashboard</h2>
            <p className="text-sm">Use the search bar above to look up City of Las Vegas entities.</p>
          </div>
        ) : (
          <div className="max-w-6xl mx-auto flex flex-col gap-6">
            
            {/* Top Profile Card */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden shrink-0">
              <div className="px-6 py-4 bg-white border-b border-slate-100 flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-bold text-[#3c49a6] flex items-center">
                    <Building2 className="h-6 w-6 mr-2 text-[#41b6e6]" />
                    {selectedBusiness.name}
                  </h2>
                  <div className="flex items-center space-x-4 mt-2 text-sm text-slate-600">
                    <span className="flex items-center"><Briefcase className="h-4 w-4 mr-1 text-slate-400"/> {selectedBusiness.type}</span>
                    <span className="flex items-center"><Users className="h-4 w-4 mr-1 text-slate-400"/> {selectedBusiness.owner}</span>
                    <span className="flex items-center"><Phone className="h-4 w-4 mr-1 text-slate-400"/> {selectedBusiness.phone}</span>
                  </div>
                </div>
              </div>
              
              {/* Profile Details Grid */}
              <div className="p-0 grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-100 bg-slate-50">
                
                {/* Column 1: Location */}
                <div className="p-5 flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-[#41b6e6] shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-bold text-[#3c49a6] uppercase tracking-wider mb-1">Physical Location</p>
                    <p className="text-sm font-bold text-slate-900">{selectedBusiness.address}</p>
                    <p className="text-sm text-slate-600">Las Vegas, NV {selectedBusiness.zip}</p>
                    <p className="text-[11px] font-semibold text-[#41b6e6] mt-1.5 uppercase tracking-wider">City of Las Vegas Jurisdiction</p>
                  </div>
                </div>
                
                {/* Column 2: Tax Info */}
                <div className="p-5 flex items-start space-x-3 bg-white">
                  <CreditCard className="h-5 w-5 text-[#41b6e6] shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-bold text-[#3c49a6] uppercase tracking-wider mb-1">Status & Tax ID</p>
                    <p className="text-sm text-slate-600 mb-2"><span className="font-semibold text-slate-900">ID:</span> {generateMockTaxId(selectedBusiness)}</p>
                    
                    {selectedBusiness.status === 'Active' ? (
                      <span className="inline-flex items-center px-2.5 py-1 rounded text-xs font-bold bg-green-100 text-green-800 border border-green-200">
                        <CheckCircle2 className="h-3.5 w-3.5 mr-1" /> Active Entity
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-1 rounded text-xs font-bold bg-red-100 text-red-800 border border-red-200">
                        <XCircle className="h-3.5 w-3.5 mr-1" /> Closed Entity
                      </span>
                    )}
                  </div>
                </div>

                {/* Column 3: Demographics */}
                <div className="p-5 flex items-start space-x-3">
                  <Award className="h-5 w-5 text-[#41b6e6] shrink-0 mt-0.5" />
                  <div className="w-full">
                    <p className="text-xs font-bold text-[#3c49a6] uppercase tracking-wider mb-2">Demographics & Certs</p>
                    {selectedBusiness.certifications.length > 0 ? (
                      <div className="flex flex-wrap gap-2">
                        {selectedBusiness.certifications.map((cert, idx) => (
                          <span key={idx} className="inline-flex items-center px-2.5 py-1 rounded text-xs font-bold bg-[#e0f2fe] text-[#0369a1] border border-[#bae6fd]">
                            <Award className="h-3.5 w-3.5 mr-1.5 opacity-70" /> {cert}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-slate-500 italic">No special certifications on file.</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom 2-Column Layout */}
            <div className="flex flex-col lg:flex-row gap-6">
              
              {/* Left Column: Licenses */}
              <div className="flex-1">
                <h3 className="text-lg font-bold text-[#3c49a6] border-b-2 border-slate-200 pb-2 mb-4 flex items-center">
                  <FileText className="h-5 w-5 mr-2 text-[#41b6e6]" />
                  License & Registration Breakdown
                </h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* State License (Mocked standard across all) */}
                  <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4 border-t-4 border-t-[#3c49a6]">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <p className="text-[10px] font-bold text-[#3c49a6] uppercase tracking-wider">State of Nevada</p>
                        <h4 className="text-base font-bold text-slate-900 leading-tight mt-0.5">State Business License</h4>
                      </div>
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold ${selectedBusiness.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {selectedBusiness.status}
                      </span>
                    </div>
                    <div className="space-y-2 text-sm text-slate-600 mt-4">
                      <div className="flex justify-between border-b border-slate-100 pb-1.5">
                        <span>License #:</span>
                        <span className="font-bold text-slate-900">NVBL-{selectedBusiness.license.slice(-5)}</span>
                      </div>
                      <div className="flex justify-between border-b border-slate-100 pb-1.5">
                        <span>Issued:</span>
                        <span className="text-slate-900">01/15/2023</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Expires:</span>
                        <span className="font-bold text-slate-900">01/15/2027</span>
                      </div>
                    </div>
                  </div>

                  {/* Local License (From Data) */}
                  <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4 border-t-4 border-t-[#41b6e6]">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <p className="text-[10px] font-bold text-[#41b6e6] uppercase tracking-wider">Local Jurisdiction</p>
                        <h4 className="text-base font-bold text-slate-900 leading-tight mt-0.5">City of Las Vegas General</h4>
                      </div>
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold ${selectedBusiness.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {selectedBusiness.status}
                      </span>
                    </div>
                    <div className="space-y-2 text-sm text-slate-600 mt-4">
                      <div className="flex justify-between border-b border-slate-100 pb-1.5">
                        <span>License #:</span>
                        <span className="font-bold text-slate-900">{selectedBusiness.license}</span>
                      </div>
                      <div className="flex justify-between border-b border-slate-100 pb-1.5">
                        <span>Category:</span>
                        <span className="text-slate-900 text-right truncate w-32" title={selectedBusiness.type}>{selectedBusiness.type}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Expires:</span>
                        <span className="font-bold text-slate-900">12/31/2026</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: AI Compliance Sidebar */}
              <div className="w-full lg:w-[320px] shrink-0">
                <div className="bg-white rounded-lg shadow-sm border border-slate-200 flex flex-col overflow-hidden">
                  <div className="bg-[#3c49a6] px-4 py-3 shrink-0 border-b-4 border-[#41b6e6]">
                    <h3 className="text-sm font-bold text-white flex items-center uppercase tracking-wide">
                      <ShieldCheck className="h-5 w-5 mr-2 text-[#41b6e6]" />
                      Proactive Compliance
                    </h3>
                  </div>
                  
                  <div className="p-5 flex-1 flex flex-col bg-slate-50">
                    {/* Status Check */}
                    <div className="mb-5">
                      <h4 className="text-[10px] font-bold text-[#3c49a6] uppercase tracking-wider mb-2">System Risk Score</h4>
                      <div className="flex items-center space-x-3 bg-white p-3 rounded-lg border border-slate-200 shadow-sm">
                        {selectedBusiness.status === 'Active' ? (
                           <>
                            <div className="bg-green-100 p-2 rounded-full border border-green-200">
                              <ShieldCheck className="h-6 w-6 text-green-600" />
                            </div>
                            <div>
                              <p className="text-sm font-bold text-slate-900">Low Risk</p>
                              <p className="text-xs text-slate-500 font-medium mt-0.5">All connected systems valid.</p>
                            </div>
                           </>
                        ) : (
                          <>
                            <div className="bg-red-100 p-2 rounded-full border border-red-200">
                              <AlertTriangle className="h-6 w-6 text-red-600" />
                            </div>
                            <div>
                              <p className="text-sm font-bold text-slate-900">Compliance Action Req.</p>
                              <p className="text-xs text-slate-500 font-medium mt-0.5">Entity marked as closed.</p>
                            </div>
                           </>
                        )}
                      </div>
                    </div>

                    {/* Timeline */}
                    <div>
                      <h4 className="text-[10px] font-bold text-[#3c49a6] uppercase tracking-wider mb-4">Recent Automated Actions</h4>
                      <div className="space-y-4">
                        <div className="relative pl-5 border-l-2 border-[#41b6e6]">
                          <div className="absolute -left-[7px] top-1 h-3 w-3 rounded-full bg-[#41b6e6] ring-4 ring-slate-50"></div>
                          <p className="text-sm font-bold text-slate-900">Data Sync: LV Open Data</p>
                          <p className="text-xs text-slate-600 mt-1 leading-relaxed">Imported latest business registry data from City of Las Vegas portal.</p>
                          <p className="text-[10px] text-[#41b6e6] font-bold mt-1.5 uppercase tracking-wide">Today</p>
                        </div>

                        <div className="relative pl-5 border-l-2 border-slate-300">
                          <div className="absolute -left-[7px] top-1 h-3 w-3 rounded-full bg-slate-400 ring-4 ring-slate-50"></div>
                          <p className="text-sm font-bold text-slate-900">Tax Verification</p>
                          <p className="text-xs text-slate-600 mt-1 leading-relaxed">Cross-referenced {generateMockTaxId(selectedBusiness)} with State Dept. of Taxation.</p>
                          <p className="text-[10px] text-slate-500 font-bold mt-1.5 uppercase tracking-wide">1 Week Ago</p>
                        </div>
                      </div>
                    </div>
                    
                    <button className="w-full mt-6 bg-white border border-[#3c49a6]/20 text-[#3c49a6] py-2.5 rounded-lg text-xs font-bold hover:bg-[#3c49a6] hover:text-white transition-colors flex items-center justify-center shadow-sm">
                      View Full Audit Trail <ChevronRight className="h-4 w-4 ml-1" />
                    </button>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}
      </main>
    </div>
  );
}