-- =============================================================
-- Dall'Ó Selfcare — Product content update
-- Run this in the Supabase SQL Editor
-- Columns used for skin products:
--   description       → "Descripción & Beneficios"
--   dosage            → "Indicaciones"
--   ingredients       → "Ingredientes INCI"
--   usage_instructions→ "Modo de uso"
--   storage           → "Conservación & Caducidad"
--   shelf_life_months → months after opening
--   frequency         → "Precauciones"
-- =============================================================

-- ── D-EVENGLOW SERUM ─────────────────────────────────────────
UPDATE products SET
  tagline            = 'Iluminación y Bio-Regeneración',
  description        = 'Es el serum despertador celular definitivo que fusiona Vit. C, E, Ferulic, SOD (Superóxido dismutasa), Azelaic Acid y Kojic Acid e Hialurónico en dosis exactas para reprogramar la piel desde el interior, auxiliando en la prevención del daño solar, ayuda a difuminar manchas rebeldes y restaura una luminosidad perdida. Fluido ligero y sedoso, de absorción inmediata sin dejar residuo graso y un aroma sutil fragancia cítrica y fresca (Citrus Reticulata), diseñada para una experiencia relajante durante la rutina nocturna.',
  dosage             = 'Especialmente indicado para pieles con manchas (hiperpigmentación), foto-envejecidas o en recuperación post-procedimientos dermatológicos.',
  ingredients        = 'Aloe Barbadensis Leaf Juice, Azelaic Acid, Niacinamide, Glycerin, Ascorbyl Glucoside, Kojic Acid, Sodium Hyaluronate, Tocopherol, Ferulic Acid, Superoxide Dismutase, Aqua, Xanthan Gum, Ethylhexylglycerin, Phenoxyethanol, Citrus Reticulata',
  usage_instructions = 'Uso exclusivo por la noche. Aplicar 4-8 gotas. No asociar con Retinol en la misma rutina nocturna.',
  storage            = 'Esta fórmula ha sido elaborada bajo pedido para garantizar la máxima calidad y eficacia de sus componentes. Conservar en un lugar fresco, seco y protegido de la luz directa del sol.',
  shelf_life_months  = 3,
  frequency          = 'Uso externo exclusivamente. Evitar el contacto directo con ojos y mucosas. En caso de contacto, aclarar con abundante agua. Si aparece irritación, suspender su uso y consultar a un especialista. Mantener fuera del alcance de los niños.'
WHERE name ILIKE '%evenglow%';

-- ── D-RESCUE SERUM ───────────────────────────────────────────
UPDATE products SET
  tagline            = 'DNA Repair System · PDRN + SOD + Q10 + Açaí',
  description        = 'Serum de alta precisión diseñado para restaurar la salud dérmica cuando la piel pierde su capacidad de defensa tras el estrés diario. El PDRN (polinucleótidos), la SOD (Superóxido Dismutase), el Aceite de Açaí rico en antocianinas y polifenoles, crean una sinergia antioxidante y antiinflamatoria superior con la Coenzima Q10 y la Vitamina E. Textura fluida y ligera, de absorción inmediata sin dejar residuo graso y un aroma sutil de fragancia cítrica.',
  dosage             = 'Ideal para todo tipo de pieles, especialmente foto-envejecidas o en recuperación post-procedimientos dermatológicos.',
  ingredients        = 'Aloe Barbadensis Leaf Juice, Aqua, Glycerin, Sodium Hyaluronate (Liposomated), DNA (PDRN), Ubiquinone (Coenzyme Q10 Liposomated), Tocopheryl Acetate, Superoxide Dismutase, Propanediol, Prunus Armeniaca Fruit Extract, Euterpe Oleracea Fruit Oil, Benzyl Alcohol, Dehydroacetic Acid, Citric Acid',
  usage_instructions = 'Uso exclusivo por la noche. Aplicar 4-8 gotas. Puede asociarse con Retinol en la misma rutina nocturna.',
  storage            = 'Esta fórmula ha sido elaborada bajo pedido para garantizar la máxima calidad y eficacia de sus componentes. Conservar en un lugar fresco, seco y protegido de la luz directa del sol.',
  shelf_life_months  = 3,
  frequency          = 'Uso externo exclusivamente. Evitar el contacto directo con ojos y mucosas. En caso de contacto, aclarar con abundante agua. Si aparece irritación, suspender su uso y consultar a un especialista. Mantener fuera del alcance de los niños.'
WHERE name ILIKE '%rescue%';

-- ── D-AOX OIL ────────────────────────────────────────────────
UPDATE products SET
  tagline            = 'Protección · Regeneración · Longevidad',
  description        = 'Blend con acción multiactiva: SOD (Superóxido dismutasa) + Vitamina E como freno total al envejecimiento ambiental; Rosa Mosqueta + Arroz para una piel elástica, sin marcas y suave; Coenzima Q10 para un rostro descansado y vitalizado; y Resveratrol para la longevidad celular. Promueve la producción de ceramidas y del factor hidratante natural (NMF), ayuda a restaurar la barrera cutánea. Aceite nutritivo y absorbente con aroma cítrico y cálido.',
  dosage             = 'Recuperación de barrera cutánea. Ayuda a reducir inflamación y estrés oxidativo, incluso en pieles atópicas o tras procedimientos dermatológicos.',
  ingredients        = 'Tocopheryl Acetate (Vit. E), Ethylhexyl Stearate, Oryza Sativa Bran Oil, Rosa Canina Fruit Oil, Olea Europaea Fruit Oil, Superoxide Dismutase (SOD), Resveratrol, Vitis Vinifera Seed Extracts, Squalane, Oryzanol, Ubiquinone (Q10), Citrus Reticulata Extract, Parfum',
  usage_instructions = 'Uso exclusivo por la noche. Aplicar 4-8 gotas. Puede asociarse con Retinol en la misma rutina nocturna.',
  storage            = 'Esta fórmula ha sido elaborada bajo pedido para garantizar la máxima calidad y eficacia de sus componentes. Conservar en un lugar fresco, seco y protegido de la luz directa del sol.',
  shelf_life_months  = 3,
  frequency          = 'Uso externo exclusivamente. Evitar el contacto directo con ojos y mucosas. En caso de contacto, aclarar con abundante agua. Si aparece irritación, suspender su uso y consultar a un especialista. Mantener fuera del alcance de los niños.'
WHERE name ILIKE '%aox%' OR name ILIKE '%daox%';

-- ── D-PURIFYING MOUSSE ───────────────────────────────────────
UPDATE products SET
  tagline            = 'Equilibrio de la Microbiota & Control Pureza',
  description        = 'Crema-gel en mousse ligeramente espumosa. Su fórmula avanzada combina aceites vegetales ozonizados y aceite de geranio (no comedogénicos), potenciados con ácido salicílico y vitamina B3 (niacinamida). Diseñada para eliminar impurezas mientras protege la microbiota de la piel. Aroma fresco y balsámico con efecto frío.',
  dosage             = 'Indicado para todo tipo de pieles, especialmente pieles grasas o con tendencia a la acumulación de lípidos.',
  ingredients        = 'Aqua, Ozonized Olea Europaea (Olive) Oil, Pelargonium Graveolens Oil, Sodium Laureth Sulfate, Acrylates Copolymer, Sodium Chloride, Lactic Acid, Niacinamide (Vitamin B3), Cocamidopropyl Betaine, Sodium Benzoate, Potassium Sorbate, Glycol Distearate, Cocamide MEA, Tetrasodium EDTA, Parfum',
  usage_instructions = 'Utilizar por la mañana y por la noche. Aplicar una pequeña cantidad sobre el rostro y cuello humedecidos, masajear hasta crear una espuma suave y dejar actuar entre uno y dos minutos. Aclarar con abundante agua tibia. Dosificación: media cucharadita de café es suficiente para una limpieza completa.',
  storage            = 'Esta fórmula ha sido elaborada bajo pedido para garantizar la máxima calidad y eficacia de sus componentes. Conservar en un lugar fresco, seco y protegido de la luz directa del sol.',
  shelf_life_months  = 4,
  frequency          = 'Uso externo exclusivamente. Evitar el contacto directo con ojos y mucosas. En caso de contacto, aclarar con abundante agua. Si aparece irritación, suspender su uso y consultar a un especialista. Mantener fuera del alcance de los niños.'
WHERE name ILIKE '%purif%' AND name ILIKE '%mousse%';

-- ── D-LONGEVITY MOUSSE ───────────────────────────────────────
UPDATE products SET
  tagline            = 'Pureza Ozonizada & Renovación',
  description        = 'Crema-gel en mousse ligeramente espumosa. Formulado con aceites vegetales ozonizados, rosa mosqueta, ácidos glicólico y láctico, además de vitaminas B5 y B12. Limpia en profundidad y protege la barrera cutánea brindando al rostro un cuidado completo.',
  dosage             = 'Indicado para todo tipo de pieles, incluso pieles sensibles.',
  ingredients        = 'Aqua, Ozonized Olive Oil, Sodium Laureth Sulfate, Acrylates Copolymer, Sodium Chloride, Glycolic Acid, Lactic Acid, Tocopheryl Acetate, Vitamin B12, Dexpanthenol, Rosa Canina Fruit Oil, Cocamidopropyl Betaine, Sodium Benzoate, Potassium Sorbate, Glycol Distearate, Cocamide MEA, Tetrasodium EDTA, Parfum',
  usage_instructions = 'Utilizar por la mañana y por la noche. Aplicar una pequeña cantidad sobre el rostro y cuello humedecidos, masajear hasta crear una espuma suave y dejar actuar entre uno y dos minutos. Aclarar con abundante agua tibia. Dosificación: media cucharadita de café es suficiente para una limpieza completa.',
  storage            = 'Esta fórmula ha sido elaborada bajo pedido para garantizar la máxima calidad y eficacia de sus componentes. Conservar en un lugar fresco, seco y protegido de la luz directa del sol.',
  shelf_life_months  = 4,
  frequency          = 'Uso externo exclusivamente. Evitar el contacto directo con ojos y mucosas. En caso de contacto, aclarar con abundante agua. Si aparece irritación, suspender su uso y consultar a un especialista. Mantener fuera del alcance de los niños.'
WHERE name ILIKE '%longevity%' AND name ILIKE '%mousse%';

-- ── D-PURIFYING SÉRUM ────────────────────────────────────────
UPDATE products SET
  tagline            = 'High-Performance Bio-Regulator · Peptide + BHA',
  description        = 'Sérum facial de alta precisión diseñado para el control de la microinflamación y la arquitectura de los poros gracias al Palmitoyl Tripeptide-8, Niacinamida y el poder exfoliante del Ácido Salicílico. El Ácido Hialurónico y el Aceite de Geranio mantienen la hidratación óptima con una sensación de frescor inmediato sin dejar residuo graso. Arquitectura olfativa cítrica-herbal con notas de Lima, Pomelo y Lemongrass.',
  dosage             = 'Especialmente indicado para pieles grasas o con tendencia a la acumulación de lípidos, piel mixta a grasa y tendencia acneica.',
  ingredients        = 'Aqua, Niacinamide, Sodium Hyaluronate, Salicylic Acid, Palmitoyl Tripeptide-8, Leuconostoc/Radish Root Ferment Filtrate, Pelargonium Graveolens Flower Oil, Citrus Limon Peel Oil, Citrus Paradisi Peel Oil, Cymbopogon Citratus Leaf Oil, Parfum',
  usage_instructions = 'Utilizar por la mañana y por la noche. Aplicar de 6 a 10 gotas sobre rostro y cuello, extendiendo con movimientos ascendentes hasta su total absorción.',
  storage            = 'Esta fórmula ha sido elaborada bajo pedido para garantizar la máxima calidad y eficacia de sus componentes. Conservar en un lugar fresco, seco y protegido de la luz directa del sol.',
  shelf_life_months  = 3,
  frequency          = 'Uso externo exclusivamente. Evitar el contacto directo con ojos y mucosas. En caso de contacto, aclarar con abundante agua. Si aparece irritación, suspender su uso y consultar a un especialista. Mantener fuera del alcance de los niños.'
WHERE name ILIKE '%purif%' AND name ILIKE '%serum%' OR name ILIKE '%purif%' AND name ILIKE '%sérum%';
