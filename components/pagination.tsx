'use client'

import {
  Pagination as PaginationComponent,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';

type PaginarionProps = {
  links: {
    url: string;
    label: string;
    active: boolean;
  }[];
};

// FALTA AJUSTAR O LAYOUT. CRIAR UM ID PARA OS LINKS, USANDO O INDEX MESMO. RECEBE ELES AQUI COM ID PARA CONSEGUIR APAGAR E
// REDERIZAR AS PAGINAS CERTAS. AI DEPOIS É SO FAZER A LOGICA DOS BOTOES DE PROXIMO E ANTERIOR ( SO IR PEGANDO A URL E IR -1 OU +1)

export default function Pagination({links}: PaginarionProps) {

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const {replace} = useRouter();

  function handleClickPage(pageNumber: number){
    const params = new URLSearchParams(searchParams)
    
    if(pageNumber > 1){
      params.set('page', pageNumber.toString())
    } else {
      params.delete('page')
    }

    replace(`${pathname}?${params.toString()}`, {scroll: false})
  }

  return (
    <PaginationComponent>
      <PaginationContent>

        <PaginationItem>
          <PaginationPrevious />
        </PaginationItem>

        {links.map((link) => {

          if(link.label.includes('Previous') || 
          link.label.includes('Next')){
            return null;
          }

          return (
          <PaginationItem className='cursor-pointer' key={link.url}>
            <PaginationLink onClick={() => handleClickPage(Number(link.label))} isActive={link.active} dangerouslySetInnerHTML={{__html: link.label}}></PaginationLink>
          </PaginationItem>
          )
        })}

        <PaginationItem>
          <PaginationNext />
        </PaginationItem>

      </PaginationContent>
    </PaginationComponent>
  );
}
