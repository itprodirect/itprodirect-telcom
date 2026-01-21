import { PricingTier } from "@/types/product";
import { formatCurrency, getTierLabel } from "@/lib/pricing";

interface PricingTableProps {
  pricing: PricingTier[];
  currentQuantity?: number;
}

export function PricingTable({ pricing, currentQuantity = 1 }: PricingTableProps) {
  const getCurrentTierIndex = () => {
    return pricing.findIndex(
      (t) =>
        currentQuantity >= t.minQty &&
        (t.maxQty === null || currentQuantity <= t.maxQty)
    );
  };

  const currentTierIndex = getCurrentTierIndex();

  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 dark:border-slate-700">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-slate-700">
        <thead className="bg-gray-50 dark:bg-slate-800">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-slate-400 uppercase tracking-wider">
              Quantity
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-slate-400 uppercase tracking-wider">
              Price/Unit
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-slate-400 uppercase tracking-wider">
              Savings
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200 dark:bg-slate-900 dark:divide-slate-700">
          {pricing.map((tier, index) => {
            const isCurrentTier = index === currentTierIndex;
            return (
              <tr
                key={tier.tier}
                className={isCurrentTier ? "bg-blue-50 dark:bg-blue-900/30" : ""}
              >
                <td className="px-4 py-3 whitespace-nowrap">
                  <span className={`text-sm ${isCurrentTier ? "font-semibold text-blue-900 dark:text-blue-300" : "text-gray-900 dark:text-slate-200"}`}>
                    {getTierLabel(tier)}
                  </span>
                  {isCurrentTier && (
                    <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-200">
                      Current
                    </span>
                  )}
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <span className={`text-sm font-medium ${isCurrentTier ? "text-blue-900 dark:text-blue-300" : "text-gray-900 dark:text-slate-200"}`}>
                    {formatCurrency(tier.pricePerUnit)}
                  </span>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  {tier.discountPercent > 0 ? (
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300">
                      Save {tier.discountPercent}%
                    </span>
                  ) : (
                    <span className="text-sm text-gray-500 dark:text-slate-500">—</span>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
